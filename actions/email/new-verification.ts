'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/db/user';
import { getVerificationTokenByToken } from '@/db/verification-token';
import { ActionsResult } from '@/types/ActionsResult';

export const newVerification = async (
  token: string
): Promise<ActionsResult> => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      isSuccess: false,
      error: {
        message: 'トークンが見つかりませんでした。',
      },
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      isSuccess: false,
      error: { message: 'トークンの有効期限が切れています。' },
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      isSuccess: false,
      error: { message: 'ユーザーが見つかりませんでした。' },
    };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    isSuccess: true,
    message: 'メールアドレスの認証が完了しました。',
  };
};
