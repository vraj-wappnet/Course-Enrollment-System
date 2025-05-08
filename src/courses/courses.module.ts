// src/courses/courses.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { CourseRepository } from './repositories/course.repository';
import { Course, CourseSchema } from './entities/course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, CourseRepository],
  exports: [CoursesService],
})
export class CoursesModule {}