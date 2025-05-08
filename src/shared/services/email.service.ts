// src/shared/services/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"${this.configService.get('SMTP_FROM_NAME')}" <${this.configService.get('SMTP_FROM_EMAIL')}>`,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}