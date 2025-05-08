// src/courses/services/courses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from '../repositories/course.repository';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from '../entities/course.entity';
import { EnrollmentStatus } from '../entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.create(createCourseDto);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const existingCourse = await this.getCourseById(id);
    const updatedCourse = await this.courseRepository.update(id, updateCourseDto);
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found after update`);
    }
    return updatedCourse;
  }

  async deleteCourse(id: string): Promise<void> {
    const existingCourse = await this.getCourseById(id);
    await this.courseRepository.delete(id);
  }

  async getCoursesByStatus(status: EnrollmentStatus): Promise<Course[]> {
    return this.courseRepository.findByStatus(status);
  }
}