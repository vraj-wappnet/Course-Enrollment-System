import { Document, Types } from 'mongoose';
import { Course } from '../../courses/entities/course.entity';

export interface IEnrollment extends Document {
  courseId: Types.ObjectId;  // Changed from typeof Course.prototype._id
  userId: string;
  progress: number;
  enrolledAt: Date;
  completedAt?: Date;
}