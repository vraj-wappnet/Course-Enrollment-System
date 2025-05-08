// src/courses/interfaces/course.interface.ts
import { Document } from 'mongoose';
import { EnrollmentStatus } from '../entities/course.entity';

export interface ICourse extends Document {
  title: string;
  instructor: string;
  duration: number;
  status: EnrollmentStatus;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}