/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Footer from './footer';

export default function PasswordResetEmail({
  email,
  resetLink,
}: {
  email: string;
  resetLink: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>パスワードの再設定について</Preview>
      <Tailwind>
        <Body className='m-auto bg-white font-sans'>
          <Container className='mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5'>
            <Section className='mt-8'></Section>
            <Heading className='mx-0 my-7 p-0 text-center text-xl font-semibold text-black'>
              確認メールの送信
            </Heading>

            <Text className='ml-1 text-sm leading-4 text-black'>
              ◆
              このメールは、ログイン時にご入力いただいたメールアドレス宛に自動的にお送りしています。
              <Link
                href={resetLink}
                className='font-medium text-blue-600 no-underline'
              >
                こちらのリンクをクリックして、メールアドレスの確認を完了してください。
              </Link>
            </Text>

            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
