import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from '../buses/entities/bus.entity';
import { RouteStop } from '../routes//entities/stop.entity';
import { Route } from '../routes/entities/route.entity';
@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,

    @InjectRepository(RouteStop)
    private readonly routeStopRepository: Repository<RouteStop>,

    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  findAll() {
    return this.busRepository.find({ relations: ['route'] });
  }

  async create(busData: Partial<Bus>, routeId?: string) {
    const bus = this.busRepository.create(busData);
    if (routeId) {
      const route = await this.routeRepository.findOne({ where: { id: routeId } });
      if (!route) {
        throw new NotFoundException(`Route with ID ${routeId} not found`);
      }
      bus.route = route;
    }
    return this.busRepository.save(bus);
  }

  async findOne(id: string) {
    return this.busRepository.findOne({ where: { id }, relations: ['route'] });
  }
}
