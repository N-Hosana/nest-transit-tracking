import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { CreateRouteDto } from './dto/create.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

 async create(dto: CreateRouteDto) {
  const route = this.routeRepository.create(dto);
  return this.routeRepository.save(route);
}

  findAll() {
    return this.routeRepository.find({ relations: ['buses'] });
  }
  async search(from: string, to: string) {
  return this.routeRepository
    .createQueryBuilder('route')
    .leftJoinAndSelect('route.stops', 'stop')
    .where('stop.name = :from OR stop.name = :to', { from, to })
    .getMany();
}

  findOne(id: string) {
    return this.routeRepository.findOne({
      where: { id },
      relations: ['buses'],
    });
  }
}
