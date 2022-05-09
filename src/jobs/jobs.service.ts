import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { crawlIBAN } from './tasks';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private httpService: HttpService) {}

  // Examples

  //   @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  //   @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  //   @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  // Crawler
  @Timeout(2000)
  async handleCrawl() {
    this.logger.debug('Crawling started...');

    this.httpService.get('https://www.iban.com/exchange-rates').subscribe((res) => {
      const data = crawlIBAN(res.data);
    });
  }
}
