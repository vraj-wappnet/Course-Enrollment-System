// src/courses/entities/course.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

export enum EnrollmentStatus {
  Open = 'Open',
  Closed = 'Closed',
  Completed = 'Completed',
}

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, maxlength: 100 })
  instructor: string;

  @Prop({ required: true })
  duration: number; // in hours

  @Prop({
    required: true,
    enum: Object.values(EnrollmentStatus),
    default: EnrollmentStatus.Open,
  })
  status: EnrollmentStatus;

  @Prop({ maxlength: 500 })
  description?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);