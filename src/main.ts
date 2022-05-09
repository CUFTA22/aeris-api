import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import createSwagger from './common/docs/swagger';
import { CORS_OPTIONS } from './common/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(CORS_OPTIONS);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out fields not defined in DTO
    }),
  );

  // Swagger docs on /api/docs
  createSwagger(app);

  await app.listen(3001);
}

bootstrap();
