// src/auth/dto/refresh-token.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'your.refresh.token.here' })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}