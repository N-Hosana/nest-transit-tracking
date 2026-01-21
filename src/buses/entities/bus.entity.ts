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

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ nullable: true })
  driver?: string;

  @Column()
  currentLocation: string;

  @ManyToOne(() => Route, (route) => route.buses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  route: Route;

  @ManyToOne(() => User, (user) => user.buses, {
    nullable: true,
  })
  createdBy: User;

  @OneToMany(() => TrackingRecord, (record) => record.bus)
  trackingRecords: TrackingRecord[];

  @CreateDateColumn()
  createdAt: Date;
}
