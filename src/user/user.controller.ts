import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '@modules/auth/decorator';
import { AtGuard } from '@modules/auth/guard';

import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  //   constructor(private userService: UserService) {}

  // --------------------
  // Get user info
  // --------------------

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
