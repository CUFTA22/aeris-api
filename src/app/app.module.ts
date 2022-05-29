import * as fs from 'fs';
import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

import { LoggerModule } from 'nestjs-pino';

// Imported modules
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { TokenModule } from '@modules/token/token.module';
import { JobsModule } from '../jobs/jobs.module';
import { TerminusModule } from '@nestjs/terminus';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { StripeModule } from '@golevelup/nestjs-stripe';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    TerminusModule,
    TokenModule, // Token signing
    JobsModule, // Cron jobs

    LoggerModule.forRoot({
      pinoHttp: {
        stream: fs.createWriteStream(path.join(__dirname, './../../logs/pino.log'), { flags: 'a' }),
      },
    }), // Pino logger

    ScheduleModule.forRoot(),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_API_KEY_TEST'),
        webhookConfig: {
          stripeWebhookSecret: configService.get('STRIPE_WEBHOOK_SECRET'),
        },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController, HealthController],

  providers: [AppService],
})
export class AppModule {}
