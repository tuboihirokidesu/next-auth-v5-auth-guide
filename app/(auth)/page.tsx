import { cn } from '@/lib/utils';
import { Noto_Sans_JP } from 'next/font/google';

const font = Noto_Sans_JP({ subsets: ['latin'], weight: ['600'] });

export default function Home() {
  return (
    <main>
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        🔐 認証入門
      </h1>
    </main>
  );
}
