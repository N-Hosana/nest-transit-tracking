import { Route } from '../routes/entities/route.entity';
import { RouteStop } from '../routes/entities/stop.entity';
import { dataSource } from './data-source';

async function seedRoutes() {
  await dataSource.initialize();

  const routeRepo = dataSource.getRepository(Route);
  const stopRepo = dataSource.getRepository(RouteStop);

  const routes = [
    {
      name: 'KIMIRONKO → NYABUGOGO',
      from: 'KIMIRONKO',
      to: 'NYABUGOGO',
      stops: ['KIMIRONKO', 'REMERA', 'KACYIRU', 'DOWNTOWN', 'NYABUGOGO'],
    },
    {
      name: 'KANOMBE → REMERA',
      from: 'KANOMBE',
      to: 'REMERA',
      stops: ['KANOMBE', 'GIKONDO', 'SONATUBE', 'REMERA'],
    },
    {
      name: 'KICUKIRO → DOWNTOWN',
      from: 'KICUKIRO',
      to: 'DOWNTOWN',
      stops: ['KICUKIRO', 'SONATUBE', 'NYARUGENGE', 'DOWNTOWN'],
    },
    {
      name: 'NYABUGOGO → KACYIRU',
      from: 'NYABUGOGO',
      to: 'KACYIRU',
      stops: ['NYABUGOGO', 'KIMISAGARA', 'NYARUGENGE', 'KACYIRU'],
    },
    {
      name: 'REMERA → KANOMBE',
      from: 'REMERA',
      to: 'KANOMBE',
      stops: ['REMERA', 'GIKONDO', 'KANOMBE'],
    },
  ];

  for (const routeData of routes) {
    const existing = await routeRepo.findOne({
      where: { name: routeData.name },
    });

    if (existing) continue;

    const route = await routeRepo.save(
      routeRepo.create({
        name: routeData.name,
        from: routeData.from,
        to: routeData.to,
      }),
    );

    for (let i = 0; i < routeData.stops.length; i++) {
      await stopRepo.save(
        stopRepo.create({
          name: routeData.stops[i],
          order: i + 1,
          route,
        }),
      );
    }
  }

  console.log(' Kigali routes & stops seeded');
  process.exit(0);
}

void seedRoutes();
