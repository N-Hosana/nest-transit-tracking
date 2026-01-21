import { Injectable, ConflictException } from '@nestjs/common';
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

  async create(dto: CreateRouteDto): Promise<Route> {
    const name = `${dto.from} → ${dto.to}`;

    const exists = await this.routeRepository.findOne({
      where: { name },
    });

    if (exists) {
      throw new ConflictException('Route already exists');
    }

    const route = this.routeRepository.create({
      name,
      from: dto.from,
      to: dto.to,
    });

    return this.routeRepository.save(route);
  }

  async findAll(): Promise<Route[]> {
    return this.routeRepository.find({
      relations: ['stops'],
      order: {
        name: 'ASC',
        stops: {
          order: 'ASC',
        },
      },
    });
  }

  async search(from: string, to: string): Promise<Route[]> {
    return this.routeRepository
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.stops', 'stop')
      .where('stop.name = :from OR stop.name = :to', { from, to })
      .getMany();
  }

  async findOne(id: string): Promise<Route | null> {
    return this.routeRepository.findOne({
      where: { id },
      relations: ['buses'],
    });
  }
}
