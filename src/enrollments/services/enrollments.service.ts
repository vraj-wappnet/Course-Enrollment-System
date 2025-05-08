// src/enrollments/services/enrollments.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { EnrollCourseDto } from '../dto/enroll-course.dto';
import { UpdateProgressDto } from '../dto/update-progress.dto';
import { Enrollment } from '../entities/enrollment.entity';
import { CoursesService } from '../../courses/services/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly coursesService: CoursesService,
  ) {}

  async enrollCourse(enrollCourseDto: EnrollCourseDto): Promise<Enrollment> {
    // Check if course exists
    const course = await this.coursesService.getCourseById(
      enrollCourseDto.courseId,
    );
    if (course.status !== 'Open') {
      throw new BadRequestException('Course is not open for enrollment');
    }

    // Check if user is already enrolled
    const existingEnrollment =
      await this.enrollmentRepository.findByUserAndCourse(
        enrollCourseDto.userId,
        enrollCourseDto.courseId,
      );
    if (existingEnrollment) {
      throw new BadRequestException('User is already enrolled in this course');
    }

    return this.enrollmentRepository.create(enrollCourseDto);
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return this.enrollmentRepository.findByUser(userId);
  }

  async updateEnrollmentProgress(
    enrollmentId: string,
    updateProgressDto: UpdateProgressDto,
  ): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.updateProgress(
      enrollmentId,
      updateProgressDto.progress,
    );
    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`,
      );
    }
    return enrollment;
  }

  async unenrollCourse(enrollmentId: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.delete(enrollmentId);
    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`,
      );
    }
  }
}
