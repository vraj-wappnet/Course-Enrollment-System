// src/auth/services/otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as otpGenerator from 'otp-generator';
import { ConfigService } from '@nestjs/config';
import { Otp, OtpDocument } from '../entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private configService: ConfigService,
  ) {}

  async generateOtp(email: string): Promise<string> {
    // Delete any existing OTP for this email
    await this.otpModel.deleteMany({ email });

    // Generate new OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    // Save OTP to database
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + (this.configService.get<number>('OTP_EXPIRES_IN') ?? 5),
    );

    await this.otpModel.create({
      email,
      otp,
      expiresAt,
    });

    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const record = await this.otpModel.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });

    return !!record;
  }

  async deleteOtp(email: string): Promise<void> {
    await this.otpModel.deleteMany({ email });
  }
}