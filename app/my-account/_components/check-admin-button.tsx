'use client';

import { checkAdmin } from '@/actions/check-admin';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

function CheckRoleButton() {
  const [isPending, startTransition] = useTransition();

  const onServerActionClick = () => {
    startTransition(async () => {
      const result = await checkAdmin();

      if (!result.isSuccess) {
        toast.error(result.error.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <Button onClick={onServerActionClick} disabled={isPending}>
      権限を確認する
    </Button>
  );
}

export default CheckRoleButton;
