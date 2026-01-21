import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { dataSource } from './data-source';

async function seed() {
  await dataSource.initialize();

  const routeRepo = dataSource.getRepository(Route);
  const stopRepo = dataSource.getRepository(RouteStop);
  const userRepo = dataSource.getRepository(User);

  const routes = [
    {
      name: 'Kigali City - Nyabugogo',
      from: 'Kigali City Center',
      to: 'Nyabugogo',
      stops: [
        { name: 'Kigali City Center', latitude: -1.9441, longitude: 30.0619, order: 1 },
        { name: 'Kimisagara', latitude: -1.9536, longitude: 30.0588, order: 2 },
        { name: 'Nyamirambo', latitude: -1.9667, longitude: 30.0588, order: 3 },
        { name: 'Nyabugogo', latitude: -1.9706, longitude: 30.0444, order: 4 },
      ],
    },
    {
      name: 'Remera - Kicukiro',
      from: 'Remera',
      to: 'Kicukiro',
      stops: [
        { name: 'Remera', latitude: -1.9358, longitude: 30.1056, order: 1 },
        { name: 'Kisimenti', latitude: -1.9441, longitude: 30.0944, order: 2 },
        { name: 'Gikondo', latitude: -1.9667, longitude: 30.0833, order: 3 },
        { name: 'Kicukiro', latitude: -1.9833, longitude: 30.0833, order: 4 },
      ],
    },
    {
      name: 'Gasabo - Kacyiru',
      from: 'Gasabo',
      to: 'Kacyiru',
      stops: [
        { name: 'Gasabo', latitude: -1.9167, longitude: 30.0833, order: 1 },
        { name: 'Kimihurura', latitude: -1.9278, longitude: 30.0944, order: 2 },
        { name: 'Kibagabaga', latitude: -1.9167, longitude: 30.1056, order: 3 },
        { name: 'Kacyiru', latitude: -1.9278, longitude: 30.1167, order: 4 },
      ],
    },
  ];

  for (const routeData of routes) {
    const { stops, ...routeInfo } = routeData;
    const route = routeRepo.create(routeInfo);
    const savedRoute = await routeRepo.save(route);

    for (const stopData of stops) {
      const stop = stopRepo.create({
        ...stopData,
        route: savedRoute,
      });
      await stopRepo.save(stop);
    }
  }

  await userRepo.save({
    email: 'admin@transit.com',
    password: await bcrypt.hash('Admin@123', 10),
    role: UserRole.ADMIN,
  });
  console.log(' Routes & Stops seeded');
  process.exit(0);
}

seed();
