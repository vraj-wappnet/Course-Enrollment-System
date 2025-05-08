// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Important: Export the service
})
export class SharedModule {}