// src/enrollments/enrollments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { EnrollmentsService } from './services/enrollments.service';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { Enrollment, EnrollmentSchema } from './entities/enrollment.entity';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enrollment.name, schema: EnrollmentSchema }]),
    CoursesModule,
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentRepository],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}