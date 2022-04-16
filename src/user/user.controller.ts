import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '@modules/auth/decorator';
import { AtGuard } from '@modules/auth/guard';

import { User } from '@prisma/client';
import { Request } from 'express';

// import { UserService } from './user.service';
// import { AuthDto } from './dto';

@Controller('users')
export class UserController {
  //   constructor(private userService: UserService) {}

  // --------------------
  // Get user info
  // --------------------

  @UseGuards(AtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
