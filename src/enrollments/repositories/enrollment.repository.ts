// src/enrollments/repositories/enrollment.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from '../entities/enrollment.entity';

@Injectable()
export class EnrollmentRepository {
  constructor(@InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>) {}

  async create(enrollCourseDto: any): Promise<Enrollment> {
    const createdEnrollment = new this.enrollmentModel(enrollCourseDto);
    return createdEnrollment.save();
  }

  async findByUserAndCourse(userId: string, courseId: string): Promise<Enrollment | null> {
    return this.enrollmentModel.findOne({ userId, courseId }).exec();
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    return this.enrollmentModel.find({ userId }).populate('courseId').exec();
  }

  async updateProgress(id: string, progress: number): Promise<Enrollment | null> {
    const updateData: any = { progress };
    if (progress === 100) {
      updateData.completedAt = new Date();
    }
    return this.enrollmentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Enrollment | null> {
    return this.enrollmentModel.findByIdAndDelete(id).exec();
  }
}