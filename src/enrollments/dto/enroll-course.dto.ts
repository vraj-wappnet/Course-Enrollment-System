// src/enrollments/dto/enroll-course.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollCourseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Course ID' })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'user123', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}