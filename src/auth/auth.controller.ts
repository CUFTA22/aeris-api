import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto } from './dto';
import { AtGuard, RtGuard } from './guard';
import { IJWT, ITokens } from './types';

import { Public } from '@common/decorator';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(AtGuard, ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // --------------------
  // User login
  // --------------------

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  loginLocal(@Body() dto: AuthDto): Promise<ITokens> {
    return this.authService.loginLocal(dto);
  }

  // --------------------
  // User registration
  // --------------------

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/register')
  registerLocal(@Body() dto: AuthDto): Promise<ITokens> {
    return this.authService.registerLocal(dto);
  }

  // --------------------
  // User logout
  // --------------------

  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  logout(@GetUser('sub') id: number) {
    return this.authService.logout(id);
  }

  // --------------------
  // User renew tokens
  // --------------------

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  refreshTokens(@GetUser() user: IJWT) {
    return this.authService.refreshTokens(user.sub, user.refresh_token);
  }
}
