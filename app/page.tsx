import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

async function MyAccountPage() {
  const session = await auth();

  console.table(session);

  return (
    <div>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button variant={'ghost'} type='submit'>
          Sign Out
        </Button>
      </form>
    </div>
  );
}

export default MyAccountPage;
