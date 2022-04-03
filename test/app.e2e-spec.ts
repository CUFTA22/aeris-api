import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  // Start the app

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip out fields not defined in DTO
      }),
    );

    await app.init();
  });

  // Close the app

  afterAll(() => {
    app.close();
  });

  it.todo('Should pass');
});
