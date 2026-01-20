import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Bus } from '../../buses/entities/bus.entity';

@Entity()
export class TrackingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => Bus, (bus) => bus.trackingRecords, {
    onDelete: 'CASCADE',
  })
  bus: Bus;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @CreateDateColumn()
  recordedAt: Date;
}
