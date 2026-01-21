import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class TrackingCron {
  constructor(@InjectQueue('eta') private etaQueue: Queue) {}

  @Cron('*/30 * * * * *')
  async refreshETAs() {
    await this.etaQueue.add('calculate', { busId: 1 });
  }
}
