import dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { Bus } from '../buses/entities/bus.entity';
import { TrackingRecord } from '../tracking/entities/tracking.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  entities: [User, Route, RouteStop, Bus, TrackingRecord],
  synchronize: false,
};
