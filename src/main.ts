// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable validation
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

//   // Swagger configuration
//   const config = new DocumentBuilder()
//     .setTitle('Online Course Enrollment System API')
//     .setDescription('API for managing courses and enrollments')
//     .setVersion('1.0')
//     .addTag('courses')
//     .addTag('enrollments')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(process.env.PORT || 3000);
// }
// bootstrap();




// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable global JWT guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Online Course Enrollment System API')
    .setDescription('API for managing courses and enrollments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();