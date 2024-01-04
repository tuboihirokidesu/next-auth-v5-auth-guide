import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'メールアドレスの確認',
    html: `<div style="padding: 10px; max-width: 300px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
            <p style="font-size: 18px; font-weight: bold;">以下のリンクをクリックしてメールアドレスを確認してください。</p>
            <a href="${confirmLink}" style="display: inline-block; background-color: #3490dc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">こちら</a>
           </div>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'パスワードのリセット',
    html: `<div style="padding: 10px; max-width: 300px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
            <p style="font-size: 18px; font-weight: bold;">以下のリンクをクリックしてパスワードをリセットしてください。</p>
            <a href="${resetLink}" style="display: inline-block; background-color: #3490dc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">こちら</a>
           </div>`,
  });
};
