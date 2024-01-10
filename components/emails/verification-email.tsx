import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import Footer from '@/components/emails/footer';

export default function VerificationEmail({
  email,
  confirmLink,
}: {
  email: string;
  confirmLink: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>確認メールの送信</Preview>
      <Tailwind>
        <Body className='m-auto bg-white font-sans'>
          <Container className='mx-auto my-10 max-w-[480px] rounded border border-solid border-gray-200 px-10 py-5'>
            <Heading className='mx-0 my-7 p-0 text-center text-xl font-semibold text-black'>
              確認メールの送信
            </Heading>

            <Text className='ml-1 text-sm leading-4 text-black'>
              ◆
              このメールは、ログイン時にご入力いただいたメールアドレス宛に自動的にお送りしています。
              <Link href={confirmLink} className='font-medium text-blue-600'>
                こちらのリンクをクリック
              </Link>
              して、メールアドレスの確認を完了してください
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
