import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const createSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Aeris API')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer('http://localhost:3001/')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup('/swagger', app, document, {});
};

export default createSwagger;
