'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { update as updateByAuthJs, auth } from '@/auth';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { editProfileSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/db/user';
import { ActionsResultWithData } from '@/types/ActionsResult';
import { revalidatePath } from 'next/cache';

export const editProfile = async (
  values: z.infer<typeof editProfileSchema>
): Promise<ActionsResultWithData<boolean>> => {
  const user = await auth().then((session) => session?.user);

  if (!user) {
    return {
      isSuccess: false,
      error: {
        message: '認証情報を取得できませんでした。',
      },
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {
      isSuccess: false,
      error: {
        message: 'ユーザーが見つかりませんでした。',
      },
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に使用されています。',
        },
      };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      isSuccess: true,
      message:
        'メールアドレスが変更されました。新しいメールアドレスを確認してください。',
      data: {
        isOpenSheet: true,
      },
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return {
        isSuccess: false,
        error: { message: 'パスワードが間違っています。' },
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  updateByAuthJs({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });

  revalidatePath('/my-account');

  return {
    isSuccess: true,
    message: 'プロフィールを更新しました。',
    data: {
      isOpenSheet: false,
    },
  };
};
