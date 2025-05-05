import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Division } from './division.entity';
import { IotDevice } from './iot-device.entity';
import { User } from './user.entity';

@Entity('machine')
export class Machine {
  @PrimaryGeneratedColumn()
  machine_id: number;

  @Column()
  division_id: number;

  @Column()
  machine_type_id: number;

  @Column()
  machine_name: string;

  @Column()
  serial_number: string;

  @Column('decimal', { precision: 15, scale: 2 })
  power_consumption: number;

  @Column()
  installation_date: Date;

  @Column()
  warranty_expiry_date: Date;

  @Column()
  last_maintenance_date: Date;

  @Column()
  next_maintenance_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @ManyToOne(() => Division, division => division.machines)
  @JoinColumn({ name: 'division_id' })
  division: Division;

  @OneToMany(() => IotDevice, iotDevice => iotDevice.machine)
  iotDevices: IotDevice[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;
}