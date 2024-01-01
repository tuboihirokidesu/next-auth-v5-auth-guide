'use server';

import { signUpSchema } from '@/schemas';
import { ActionsResult } from '@/types/ActionsResult';
import { z } from 'zod';

export const signUp = async (
  values: z.infer<typeof signUpSchema>
): Promise<ActionsResult> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  return {
    isSuccess: true,
    message: 'サインアップに成功しました。',
  };
};
