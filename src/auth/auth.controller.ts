import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto, TokensDto } from './dto';
import { AtGuard, RtGuard } from './guard';
import { IJWT, ITokens } from './types';

import { Public } from '@common/decorator';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@UseGuards(AtGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // --------------------------------------------------------------------------------
  // User login
  // --------------------------------------------------------------------------------

  @ApiOperation({
    summary: 'User login',
    description: 'Gives back a pair of tokens if credentials match',
  })
  @ApiBody({
    type: AuthDto,
    description: 'Email & Password',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  loginLocal(@Body() dto: AuthDto): Promise<ITokens> {
    return this.authService.loginLocal(dto);
  }

  // --------------------------------------------------------------------------------
  // User registration
  // --------------------------------------------------------------------------------

  @ApiOperation({
    summary: 'User registration',
    description: 'Gives back a pair of tokens if credentials match, creates new user',
  })
  @ApiBody({
    type: AuthDto,
    description: 'Email & Password',
  })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/register')
  registerLocal(@Body() dto: AuthDto): Promise<ITokens> {
    return this.authService.registerLocal(dto);
  }

  // --------------------------------------------------------------------------------
  // User logout
  // --------------------------------------------------------------------------------

  @ApiOperation({
    summary: 'User logout',
    description: 'Removes hashedRt from database',
  })
  @ApiHeaders([{ name: 'Authorization', allowEmptyValue: false, description: 'JWT' }])
  @HttpCode(HttpStatus.OK)
  @Post('local/logout')
  logout(@GetUser('sub') id: number) {
    return this.authService.logout(id);
  }

  // --------------------------------------------------------------------------------
  // User renew tokens
  // --------------------------------------------------------------------------------

  @ApiOperation({
    summary: 'Renew tokens',
    description: 'Gives back a new pair of tokens if old ones expire',
  })
  @ApiHeaders([{ name: 'Authorization', allowEmptyValue: false, description: 'JWT' }])
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('local/refresh')
  refreshTokens(@GetUser() user: IJWT) {
    return this.authService.refreshTokens(user.sub, user.refresh_token);
  }
}
