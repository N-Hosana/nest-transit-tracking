import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Route, RouteStop],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const routeRepo = dataSource.getRepository(Route);
  const stopRepo = dataSource.getRepository(RouteStop);
  const userRepo = dataSource.getRepository(User);

  const route = routeRepo.create({
    name: 'Kigali – Kabuga',
  });
  
  await routeRepo.save(route);
  
  await userRepo.save({
    email: 'admin@transit.com',
    password: await bcrypt.hash('Admin@123', 10),
    role: UserRole.ADMIN,
  });
  const stops = [
    { name: 'Kigali CBD', latitude: -1.9441, longitude: 30.0619, order: 1 },
    { name: 'Nyabugogo', latitude: -1.9385, longitude: 30.0441, order: 2 },
    { name: 'Kabuga', latitude: -1.4992, longitude: 29.6345, order: 3 },
  ].map((stop) =>
    stopRepo.create({
      ...stop,
      route,
    }),
  );

  await stopRepo.save(stops);

  console.log('✅ Routes & Stops seeded');
  process.exit(0);
}

seed();
