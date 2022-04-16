import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

// Access token strategy

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    return payload;
  }
}
