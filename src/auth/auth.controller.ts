import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // --------------------
  // User login
  // --------------------

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  // --------------------
  // User registration
  // --------------------

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
