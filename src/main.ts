import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

import { CORS_OPTIONS, GLOBAL_PIPES } from './common/config';
import createSwagger from './common/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(CORS_OPTIONS);
  app.useGlobalPipes(...GLOBAL_PIPES);

  // Swagger docs on /api/docs
  createSwagger(app);

  await app.listen(3001);
}

bootstrap();
