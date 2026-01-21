import { dataSource } from './data-source';
import { Bus } from '../buses/entities/bus.entity';
import { Route } from '../routes/entities/route.entity';

async function seedBuses() {
  await dataSource.initialize();

  const busRepo = dataSource.getRepository(Bus);
  const routeRepo = dataSource.getRepository(Route);

  const routes = await routeRepo.find();

  if (!routes.length) {
    throw new Error('No routes found. Seed routes first.');
  }

  const buses = [
    {
      plateNumber: 'RAC 201 A',
      capacity: 45,
      price: 400,
      currentLocation: 'KIMIRONKO',
      routeName: 'KIMIRONKO → NYABUGOGO',
    },
    {
      plateNumber: 'RAC 305 B',
      capacity: 30,
      price: 300,
      currentLocation: 'KANOMBE',
      routeName: 'KANOMBE → REMERA',
    },
    {
      plateNumber: 'RAC 778 C',
      capacity: 50,
      price: 500,
      currentLocation: 'NYABUGOGO',
      routeName: 'NYABUGOGO → KACYIRU',
    },
  ];

  for (const busData of buses) {
    const exists = await busRepo.findOne({
      where: { plateNumber: busData.plateNumber },
    });

    if (exists) continue;

    const route = await routeRepo.findOne({
      where: { name: busData.routeName },
    });

    if (!route) continue;

    await busRepo.save(
      busRepo.create({
        plateNumber: busData.plateNumber,
        capacity: busData.capacity,
        price: busData.price,
        currentLocation: busData.currentLocation,
        route,
      }),
    );
  }

  console.log(' Buses seeded');
  process.exit(0);
}

void seedBuses();
