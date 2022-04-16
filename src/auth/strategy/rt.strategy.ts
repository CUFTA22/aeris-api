import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

// Refresh token strategy

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // Give us refresh token
    });
  }

  async validate(req: Request, payload: any) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim();

    return { ...payload, refresh_token };
  }
}
