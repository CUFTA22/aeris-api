import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS_OPTIONS: CorsOptions = {
  origin: '*',
  allowedHeaders: '*',
};

export const GLOBAL_PIPES = [
  new ValidationPipe({
    whitelist: true, // Strip out fields not defined in DTO
  }),
];
