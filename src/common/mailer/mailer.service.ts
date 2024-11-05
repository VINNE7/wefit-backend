import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private readonly nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport(
      {
        host: this.configService.get<string>('EMAIL_HOST'),
        port: this.configService.get<number>('EMAIL_PORT'),
        auth: {
          user: this.configService.get<string>('EMAIL_AUTH_USER'),
          pass: this.configService.get<string>('EMAIL_AUTH_PASSWORD'),
        },
        debug: this.configService.get<boolean>('EMAIL_DEBUG'),
        logger: false,
      },
      { from: this.configService.get<string>('EMAIL_FROM_ADDRESS') },
    );
  }
  public sendRandomPasswordEmail(
    customerEmail: string,
    randomPassword: string,
  ) {
    return this.nodemailerTransport.sendMail({
      from: this.configService.get<string>('EMAIL_FROM_ADDRESS'),
      to: customerEmail,
      subject: `Your account's random password! - WeFit`,
      html: this.randomPasswordEmail(randomPassword),
    });
  }

  private randomPasswordEmail(randomPassword: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your New Account Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
    }
    .password-box {
      background-color: #e9ecef;
      font-weight: bold;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 20px 0;
      font-size: 18px;
      color: #000;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Account Password</h1>
    <p>Hello,</p>
    <p>We have generated a random password for your account. Please use this password to log in, and consider updating it to something more memorable as soon as possible.</p>
    <div class="password-box">
      ${randomPassword}
    </div>
    <p>If you did not request this password or need further assistance, please contact our support team.</p>
    <p>Best regards,<br> Wefit Team</p>
    <div class="footer">
      2024 WeFit. All rights reserved.
    </div>
  </div>
</body>
</html>`;
  }
}
