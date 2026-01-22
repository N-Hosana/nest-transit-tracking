import dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Route } from 'src/routes/entities/route.entity';
import { RouteStop } from 'src/routes/entities/stop.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { TrackingRecord } from 'src/tracking/entities/tracking.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  entities: [User, Route, RouteStop, Bus, TrackingRecord],
  autoLoadEntities: true,
  synchronize: true,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};
