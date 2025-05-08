// src/courses/repositories/course.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../entities/course.entity';

@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(createCourseDto: any): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findById(id).exec();
  }

  async update(id: string, updateCourseDto: any): Promise<Course | null> {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Course | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  async findByStatus(status: string): Promise<Course[]> {
    return this.courseModel.find({ status }).exec();
  }
}