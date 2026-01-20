import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Route } from '../../routes/entities/route.entity';
import { User } from '../../users/entities/user.entity';
import { TrackingRecord } from '../../tracking/entities/tracking.entity';

export enum BusStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  plateNumber: string;

  @Column({
    type: 'enum',
    enum: BusStatus,
    default: BusStatus.INACTIVE,
  })
  status: BusStatus;
  @Column()
  currentLocation: string;

  @ManyToOne(() => Route, (route) => route.buses, {
    nullable: true,
  })
  route: Route;

  @ManyToOne(() => User, (user) => user.buses)
  createdBy: User;

  @OneToMany(() => TrackingRecord, (stop) => stop.bus)
  trackingRecords: TrackingRecord[];

  @CreateDateColumn()
  createdAt: Date;
}
