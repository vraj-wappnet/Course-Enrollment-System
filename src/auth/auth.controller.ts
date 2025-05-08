// src/auth/auth.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from 'src/shared/services/email.service';
import { OtpService } from './services/otp.service';
import { EmailTemplate } from 'src/shared/templates/email.template';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  //email
  @Public()
  @Post('forgot-password')
  @ApiResponse({
    status: 200,
    description: 'OTP sent to email if account exists',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // Check if user exists (without revealing status)
    const user = await this.authService.findByEmail(forgotPasswordDto.email);

    if (user) {
      // Generate OTP
      const otp = await this.otpService.generateOtp(forgotPasswordDto.email);

      // Send email with OTP
      await this.emailService.sendMail(
        forgotPasswordDto.email,
        'Password Reset OTP',
        EmailTemplate.getResetPasswordOtpTemplate(otp), // Using the template
      );
    }

    // Always return the same message regardless of email existence
    return {
      message: 'If an account exists with this email, an OTP has been sent',
    };
  }

  @Public()
  @Post('verify-otp')
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const isValid = await this.otpService.verifyOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid OTP or OTP expired');
    }

    return { message: 'OTP verified successfully' };
  }

  @Public()
  @Post('reset-password')
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Verify OTP first
    const isValid = await this.otpService.verifyOtp(
      resetPasswordDto.email,
      resetPasswordDto.otp,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid OTP or OTP expired');
    }

    // Update password
    await this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.newPassword,
    );

    // Delete OTP after successful reset
    await this.otpService.deleteOtp(resetPasswordDto.email);

    return { message: 'Password reset successfully' };
  }

  // In forgotPassword method
}
