import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

import { CORS_OPTIONS, GLOBAL_PIPES } from './common/config';
import createReDoc from './common/docs/redoc';
import createSwagger from './common/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: process.env.NODE_ENV === 'development',
  });

  app.use(helmet());
  app.enableCors(CORS_OPTIONS);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(...GLOBAL_PIPES);

  // Swagger & ReDoc documentation
  createSwagger(app); // /swagger
  createReDoc(app); // /redoc

  await app.listen(3002);
}

bootstrap();
