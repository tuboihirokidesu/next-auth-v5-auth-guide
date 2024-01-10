'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn as signInByAuthJS } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signInSchema } from '@/schemas';
import { getUserByEmail } from '@/db/user';
import { ActionsResult } from '@/types/ActionsResult';

export const signIn = async (
  values: z.infer<typeof signInSchema>
): Promise<ActionsResult> => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      isSuccess: false,
      error: {
        message: 'Invalid credentials!',
      },
    };
  }

  try {
    await signInByAuthJS('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      isSuccess: true,
      message: 'ログインに成功しました。',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが間違っています。',
            },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: 'ログインに失敗しました。',
            },
          };
      }
    }

    throw error;
  }
};
