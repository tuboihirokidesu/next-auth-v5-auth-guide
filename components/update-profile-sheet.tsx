'use client';

import React, { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '@/components/spinner';
import { editProfileSchema } from '@/schemas/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import { UserRole } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { editProfile } from '@/actions/edit-profile';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const EditProfileSheet = () => {
  const user = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    startTransition(async () => {
      try {
        const result = await editProfile(data);

        if (result.isSuccess) {
          toast.success(result.message);
          setIsOpen(result.data.isOpenSheet);
        } else {
          toast.error(result.error.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('エラーが発生しました。');
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className='gap-2'>
          プロフィールを編集
          <ChevronRight size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-auto'>
        <SheetHeader>
          <SheetTitle>
            <h2 className='text-xl font-bold'>プロフィールを編集</h2>
          </SheetTitle>
          <SheetDescription>
            プロフィールを編集することができます。
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className='mt-4 grid gap-4'
            onSubmit={(...arg) => void form.handleSubmit(onSubmit)(...arg)}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
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
            <Separator />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>現在のパスワード</FormLabel>
                  <FormControl>
                    <Input placeholder='1234567' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新しいパスワード</FormLabel>
                  <FormControl>
                    <Input placeholder='1234567' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => {
                return (
                  <FormItem className='space-y-2'>
                    <FormLabel>権限</FormLabel>
                    <FormControl className='space-y-4'>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='grid'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={UserRole.ADMIN} />
                          </FormControl>
                          <div className='flex flex-col gap-2'>
                            <FormLabel className='font-normal'>
                              管理者
                            </FormLabel>
                            <FormDescription className='text-sm text-muted-foreground'>
                              管理者は全ての権限を持っています。
                            </FormDescription>
                          </div>
                        </FormItem>
                        <FormItem className='flex items-center justify-start space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={UserRole.USER} />
                          </FormControl>
                          <div className='flex flex-col gap-2'>
                            <FormLabel className='font-normal'>
                              ユーザー
                            </FormLabel>
                            <FormDescription className='text-sm text-muted-foreground'>
                              ユーザーは一部の権限を持っています。
                            </FormDescription>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {user?.isOAuth === false && (
              <>
                <Separator />
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg'>
                      <div className='space-y-0.5'>
                        <FormLabel>二段階認証(OTP)</FormLabel>
                        <FormDescription>
                          二段階認証を有効にすると、ログイン時にOTPが必要になります。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className='flex justify-end'>
              <Button disabled={isPending} type='submit' className='w-fit'>
                {isPending && <Spinner className='mr-2 h-4 w-4 animate-spin' />}
                変更を保存
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
