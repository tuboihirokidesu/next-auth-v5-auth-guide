'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/email/new-verification';
import { Spinner } from '@/components/spinner';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError('トークンが見つかりませんでした。');
      return;
    }

    const result = await newVerification(token);
    if (!result.isSuccess) {
      setError(result.error.message);
      return;
    }

    setSuccess(result.message);
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className='flex items-center w-full justify-center'>
      {!success && !error && <Spinner size={'lg'} />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
