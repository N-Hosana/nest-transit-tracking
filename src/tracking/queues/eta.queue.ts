import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { TrackingService } from '../tracking.service';

@Processor('eta')
export class EtaProcessor {
  constructor(
    private readonly trackingService: TrackingService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Process('calculate')
  async handle(job: Job<{ busId: string }>) {
    const eta = await this.trackingService.calculateETA(job.data.busId);

    await this.redis.set(`bus:${job.data.busId}:eta`, eta, 'EX', 60);

    return eta;
  }
}
