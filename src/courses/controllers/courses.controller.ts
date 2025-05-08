// src/courses/controllers/courses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Course } from '../entities/course.entity';
import { EnrollmentStatus } from '../entities/course.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
    type: Course,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'Return all courses.',
    type: [Course],
  })
  async findAll(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Return the course.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.getCourseById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
    type: Course,
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.deleteCourse(id);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get courses by status' })
  @ApiParam({ name: 'status', enum: EnrollmentStatus })
  @ApiResponse({
    status: 200,
    description: 'Return courses with the specified status.',
    type: [Course],
  })
  async findByStatus(
    @Param('status') status: EnrollmentStatus,
  ): Promise<Course[]> {
    return this.coursesService.getCoursesByStatus(status);
  }
}
