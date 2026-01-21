import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './routes/routes.module';
import { BusesModule } from './buses/buses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './database/typeorm.config';
import { Route } from './routes/entities/route.entity';
import { RouteStop } from './routes/entities/stop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Route, RouteStop]),
    RoutesModule,
    BusesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
