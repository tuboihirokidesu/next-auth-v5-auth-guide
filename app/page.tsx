import { auth } from '@/auth';
import React from 'react';

async function MyAccountPage() {
  const session = await auth();

  console.table(session);

  return <div>Root Page</div>;
}

export default MyAccountPage;
