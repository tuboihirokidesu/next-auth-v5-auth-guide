import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';
import EditProfileSheet from './my-account/_components/update-profile-sheet';

async function MyAccountPage() {
  const user = await auth().then((res) => res?.user);

  console.table(user);

  return (
    <div>
      <EditProfileSheet />
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
