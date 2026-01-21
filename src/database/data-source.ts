import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { Bus } from '../buses/entities/bus.entity';
import { TrackingRecord } from '../tracking/entities/tracking.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Route, RouteStop, Bus, TrackingRecord],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
