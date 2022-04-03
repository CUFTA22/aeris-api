import { Module } from '@nestjs/common';

// Imported modules
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { BookmarkModule } from '@modules/bookmark/bookmark.module';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
