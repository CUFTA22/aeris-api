import { ITokens } from '@modules/auth/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ----------------------------------------
  // Sign JWT tokens
  // ----------------------------------------

  async signTokens(id: number, email: string): Promise<ITokens> {
    const payload = { sub: id, email };

    const accessSecret = this.config.get('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m', // 15 minutes
        issuer: 'Aeris',
        secret: accessSecret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d', // 1 week
        issuer: 'Aeris',
        secret: refreshSecret,
      }),
    ]);

    return { access_token, refresh_token };
  }
}
