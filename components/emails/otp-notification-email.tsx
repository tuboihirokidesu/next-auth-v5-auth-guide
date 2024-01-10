import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Tailwind,
  Preview,
} from '@react-email/components';
import Footer from '@/components/emails/footer';

export default function OTPNotificationEmail({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>OTP確認メール</Preview>
      <Tailwind>
        <Body className='m-auto bg-white font-sans'>
          <Container className='mx-auto my-10 max-w-[480px] rounded border border-solid border-gray-200 px-10 py-5'>
            <Heading className='mx-0 my-7 p-0 text-center text-xl font-semibold text-black'>
              OTP確認メール
            </Heading>

            <Text className='ml-1 text-sm leading-4 text-black'>
              あなたのOTPコードは
              <span className='font-medium text-blue-600'>{otpCode}</span>
              です。このコードを使用して認証を完了してください。
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
