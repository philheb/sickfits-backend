import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘 Sick Fits Team</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  //email the user a token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset link!',
    html: makeANiceEmail(`Click on the link to reset your password
    
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">CHANGE YOUR PASSWORD</a>
    `),
  });
  console.log(info);
}
