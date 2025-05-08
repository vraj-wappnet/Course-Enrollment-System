// src/courses/dto/create-course.dto.ts
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { EnrollmentStatus } from '../entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to NestJS', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'John Doe', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  instructor: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({ enum: EnrollmentStatus, example: EnrollmentStatus.Open })
  @IsEnum(EnrollmentStatus)
  @IsNotEmpty()
  status: EnrollmentStatus;

  @ApiProperty({
    example: 'A comprehensive course on NestJS',
    required: false,
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
