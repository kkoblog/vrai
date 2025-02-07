import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { lastName, firstName, phone, email, message, experience } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `応募フォーム: ${lastName}${firstName}様より`,
      text: `
応募内容:

お名前: ${lastName} ${firstName}
電話番号: ${phone}
メールアドレス: ${email || '未入力'}
美容師歴: ${experience}

メッセージ:
${message}

---------------------
このメールは応募フォームから自動送信されています。
      `.trim()
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '送信成功' });

  } catch (error) {
    console.error('エラーの詳細:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
} 