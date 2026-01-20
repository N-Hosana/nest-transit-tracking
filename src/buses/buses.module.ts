import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bus, Route, RouteStop])],
  providers: [BusesService],
  controllers: [BusesController],
})
export class BusesModule {}
