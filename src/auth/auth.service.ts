import { ForbiddenException, Injectable } from '@nestjs/common';

import { TokenService } from '@modules/token/token.service';
import { UserService } from '@modules/user/user.service';

import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ITokens } from './types';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private token: TokenService, private user: UserService) {}

  // ----------------------------------------
  // User login
  // ----------------------------------------

  async loginLocal(dto: AuthDto) {
    const user = await this.user.findByField('email', dto.email);

    // Check if user exists
    if (!user) throw new ForbiddenException('Incorrect credentials');

    // Compare passwords
    const isMatch = await argon.verify(user?.hash, dto.password);

    if (!isMatch) throw new ForbiddenException('Incorrect credentials');

    return await this.getUserTokens(user);
  }

  // ----------------------------------------
  // User registration
  // ----------------------------------------

  async registerLocal(dto: AuthDto): Promise<ITokens> {
    // Hash password
    const hash = await argon.hash(dto.password);

    // Create user
    const user = await this.user.createUser(dto.email, hash);

    return await this.getUserTokens(user);
  }

  // ----------------------------------------
  // User logout
  // ----------------------------------------

  async logout(id: number) {
    // Remove hashedRt
    await this.user.updateUserById(id, 'hashedRt', '');
  }

  // ----------------------------------------
  // User refresh tokens
  // ----------------------------------------

  async refreshTokens(id: number, rt: string) {
    const user = await this.user.findByField('id', id);

    // Check if user exists
    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    // Compare token hash
    const isMatch = await argon.verify(user.hashedRt, rt);

    if (!isMatch) throw new ForbiddenException('Access denied');

    return await this.getUserTokens(user);
  }

  // ----------------------------------------------------------------------------------
  // Utils
  // ----------------------------------------------------------------------------------

  // ----------------------------------------
  // Update RT hash
  // ----------------------------------------

  async updateRtHash(id: number, rt: string) {
    const hashedRt = await argon.hash(rt);
    await this.user.updateUserById(id, 'hashedRt', hashedRt);
  }

  // ----------------------------------------
  // Update RT hash
  // ----------------------------------------

  async getUserTokens(user: User): Promise<ITokens> {
    const tokens = await this.token.signTokens(user.id, user.email);

    // Update hash
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
