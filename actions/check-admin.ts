'use server';

import { auth } from '@/auth';
import { ActionsResult } from '@/types/ActionsResult';
import { UserRole } from '@prisma/client';

export const checkAdmin = async (): Promise<ActionsResult> => {
  const role = await auth().then((session) => session?.user?.role);

  if (role === UserRole.ADMIN) {
    return { isSuccess: true, message: 'Admin権限があります。' };
  }

  return {
    isSuccess: false,
    error: {
      message: 'Admin権限がありません。',
    },
  };
};
