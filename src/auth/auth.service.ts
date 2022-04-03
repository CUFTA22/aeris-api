import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ----------------------------------------
  // Sign JWT token
  // ----------------------------------------

  async signToken(
    id: number,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: id, // Subject
      email,
    };

    const secret = this.config.get('JWT_ACCESS_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m', // 15 minutes
      issuer: 'Aeris',
      secret,
    });
  }

  // ----------------------------------------
  // User login
  // ----------------------------------------

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // Check if user exists
    if (!user)
      throw new ForbiddenException('Incorrect credentials');

    // Compare passwords

    const isMatch = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!isMatch)
      throw new ForbiddenException('Incorrect credentials');

    return {
      access_token: this.signToken(user.id, user.email),
    };
  }

  // ----------------------------------------
  // User registration
  // ----------------------------------------

  async register(dto: AuthDto) {
    // Hash password

    const hash = await argon.hash(dto.password);

    // Create user

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return {
        access_token: this.signToken(user.id, user.email),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002 - unique field error
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }
}
