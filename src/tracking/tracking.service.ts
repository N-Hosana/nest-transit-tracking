import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from '../buses/entities/bus.entity';
import { RouteStop } from 'src/routes/entities/stop.entity';
import { haversineDistance, estimateETA } from '../utils/geo.utils';
import { getCoordinates } from '../utils/geo.utils';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,

    @InjectRepository(RouteStop)
    private readonly routeStopRepository: Repository<RouteStop>,
  ) {}

  async calculateETA(busId: string): Promise<number> {
    const bus = await this.busRepository.findOne({
      where: { id: busId },
      relations: ['route'],
    });
    if (!bus) {
      throw new NotFoundException('Bus not found');
    }

    if (!bus.currentLocation) {
      throw new NotFoundException('Bus location unavailable');
    }

    const fromCoords = getCoordinates(bus.currentLocation);
    const toCoords = getCoordinates(bus.route.to);

    const distanceKm = haversineDistance(
      fromCoords.lat,
      fromCoords.lng,
      toCoords.lat,
      toCoords.lng,
    );

    const AVERAGE_BUS_SPEED_KMH = 50;

    return estimateETA(distanceKm, AVERAGE_BUS_SPEED_KMH);
  }

  async updateBusLocation(busId: string): Promise<Bus> {
    const bus = await this.busRepository.findOne({ where: { id: busId } });
    if (!bus) throw new NotFoundException('Bus not found');

    return this.busRepository.save(bus);
  }
}
