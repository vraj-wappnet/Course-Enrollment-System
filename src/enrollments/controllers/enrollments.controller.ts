// src/enrollments/controllers/enrollments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from '../services/enrollments.service';
import { EnrollCourseDto } from '../dto/enroll-course.dto';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Enrollment } from '../entities/enrollment.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('enrollments')
@Controller('enrollments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({
    status: 201,
    description: 'Successfully enrolled in the course.',
    type: Enrollment,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async enroll(@Body() enrollCourseDto: EnrollCourseDto): Promise<Enrollment> {
    return this.enrollmentsService.enrollCourse(enrollCourseDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user enrollments' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Return user enrollments.',
    type: [Enrollment],
  })
  async getUserEnrollments(
    @Param('userId') userId: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentsService.getUserEnrollments(userId);
  }

  @Put(':id/progress')
  @ApiOperation({ summary: 'Update enrollment progress' })
  @ApiParam({ name: 'id', description: 'Enrollment ID' })
  @ApiResponse({
    status: 200,
    description: 'Progress updated.',
    type: Enrollment,
  })
  @ApiResponse({ status: 404, description: 'Enrollment not found.' })
  async updateProgress(
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateEnrollmentProgress(
      id,
      updateProgressDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Unenroll from a course' })
  @ApiParam({ name: 'id', description: 'Enrollment ID' })
  @ApiResponse({ status: 200, description: 'Successfully unenrolled.' })
  @ApiResponse({ status: 404, description: 'Enrollment not found.' })
  async unenroll(@Param('id') id: string): Promise<void> {
    return this.enrollmentsService.unenrollCourse(id);
  }
}
