import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './routes/routes.module';
import { BusesModule } from './buses/buses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TrackingModule } from './tracking/tracking.module';
import { typeOrmConfig } from './database/typeorm.config';
import { BusSeederService } from './database/bus-seeder.service';
import { Route } from './routes/entities/route.entity';
import { RouteStop } from './routes/entities/stop.entity';
import { Bus } from './buses/entities/bus.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Route, RouteStop, Bus]),
    AuthModule,
    UsersModule,
    RoutesModule,
    BusesModule,
    AuthModule,
    UsersModule,
    TrackingModule,
  ],
  providers: [BusSeederService],
})
export class AppModule {}
