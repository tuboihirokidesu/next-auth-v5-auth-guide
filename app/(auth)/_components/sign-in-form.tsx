'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas/index';
import { signIn } from '@/actions/email/sign-in';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function SignInForm() {
  const [error, setError] = useState<string | undefined>('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'このメールアドレスは既に別のプロバイダーで登録されています。'
      : '';

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await signIn(values);

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      toast.success(result.message);

      if (result.data.isTwoFactorEnabled) {
        setShowTwoFactor(true);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {showTwoFactor && (
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP認証</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='123456' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!showTwoFactor && (
          <>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input placeholder='1234567' {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button
                    size='sm'
                    variant='link'
                    asChild
                    className='px-0 font-normal'
                  >
                    <Link href='/reset-password'>
                      パスワードをお忘れですか？
                    </Link>
                  </Button>
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder='shadcn@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input placeholder='1234567' {...field} />
              </FormControl>
              <Button
                size='sm'
                variant='link'
                asChild
                className='px-0 font-normal'
              >
                <Link href='/reset-password'>パスワードをお忘れですか？</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error || urlError} />
        <Button type='submit' disabled={isPending}>
          {showTwoFactor ? '確認' : 'ログイン'}
        </Button>
      </form>
    </Form>
  );
}
