import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { Noto_Sans_JP } from 'next/font/google';

const font = Noto_Sans_JP({ subsets: ['latin'], weight: ['600'] });

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='container flex flex-col h-full justify-center gap-x-12 py-4 lg:py-6'>
      <h1 className={cn('text-3xl font-semibold text-center', font.className)}>
        🔐 認証入門
      </h1>
      {children}
    </main>
  );
};

export default AuthLayout;
