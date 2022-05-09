import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Module({
  providers: [JobsService],
  imports: [HttpModule],
})
export class JobsModule {}
