// src/courses/dto/update-course.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { EnrollmentStatus } from '../entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({ example: 'Advanced NestJS', required: false, maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @ApiProperty({ example: 'Jane Smith', required: false, maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  instructor?: string;

  @ApiProperty({ example: 15, required: false })
  @IsInt()
  @IsOptional()
  duration?: number;

  @ApiProperty({ enum: EnrollmentStatus, example: EnrollmentStatus.Closed, required: false })
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @ApiProperty({ example: 'An advanced course on NestJS', required: false, maxLength: 500 })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}