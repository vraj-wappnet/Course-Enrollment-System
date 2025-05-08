// src/enrollments/dto/update-progress.dto.ts
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @ApiProperty({ example: 50, minimum: 0, maximum: 100 })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  progress: number;
}