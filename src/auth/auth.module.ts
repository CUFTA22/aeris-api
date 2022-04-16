import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategy';

import { UserService } from '@modules/user/user.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, UserService],
})
export class AuthModule {}
