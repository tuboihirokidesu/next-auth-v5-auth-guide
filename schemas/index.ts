import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です。',
  }),
  password: z.string().min(6, {
    message: 'パスワードは6文字以上です。',
  }),
  nickname: z.string().min(1, {
    message: 'ニックネームは必須です。',
  }),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です。',
  }),
  password: z.string().min(6, {
    message: 'パスワードは6文字以上です。',
  }),
  code: z.optional(z.string()),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'パスワードは6文字以上です。',
  }),
});

export const editProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'ニックネームは必須です。',
  }),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
});
