import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';

import { Bus } from '../buses/entities/bus.entity';
import { RouteStop } from '../routes/entities/stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus, RouteStop])],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
