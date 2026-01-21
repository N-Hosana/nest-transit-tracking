import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { RouteStop } from './stop.entity';
import { Bus } from '../../buses/entities/bus.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @OneToMany(() => Bus, (bus) => bus.route)
  buses: Bus[];

  @OneToMany(() => RouteStop, (stop) => stop.route)
  stops?: RouteStop[];

  @CreateDateColumn()
  createdAt: Date;
}
