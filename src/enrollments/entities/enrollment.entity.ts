// src/enrollments/entities/enrollment.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from '../../courses/entities/course.entity';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  progress: number;

  @Prop({ type: Date, default: Date.now })
  enrolledAt: Date;

  @Prop({ type: Date })
  completedAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);