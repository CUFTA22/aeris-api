import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

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

  const config = new DocumentBuilder()
    .setTitle('Aeris API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
