import { Hr, Tailwind, Text } from '@react-email/components';

export default function Footer({ email }: { email: string }) {
  return (
    <Tailwind>
      <Hr className='mx-0 my-6 w-full border border-gray-200' />

      <Text className='text-[12px] leading-6 text-gray-500'>
        このメールは <span className='text-black'>{email}</span>
        宛に送信されました。このメールに心当たりがない場合は、お手数ですがこのまま削除してください。
      </Text>
    </Tailwind>
  );
}
