import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// Imported modules
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { BookmarkModule } from '@modules/bookmark/bookmark.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { TokenModule } from '@modules/token/token.module';

import { AtGuard } from './auth/guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    TokenModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
