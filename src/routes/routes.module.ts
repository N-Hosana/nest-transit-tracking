import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { RouteStop } from './entities/stop.entity';
import { RoutesService } from './route.service';
import { RoutesController } from './route.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteStop])],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService],
})
export class RoutesModule {}
