import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

const redocOptions: RedocOptions = {
  title: 'Hello Nest',
  logo: {
    url: 'https://redocly.github.io/redoc/petstore-logo.png',
    backgroundColor: '#F0F0F0',
    altText: 'PetStore logo',
  },
  sortPropsAlphabetically: true,
  hideDownloadButton: false,
  hideHostname: false,
  auth: {
    enabled: true,
    user: 'admin',
    password: '123',
  },
  tagGroups: [
    {
      name: 'Core resources',
      tags: ['cats'],
    },
  ],
};

const createReDoc = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Aeris API')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer('http://localhost:3001/')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  RedocModule.setup('/redoc', app, document, redocOptions);
};

export default createReDoc;
