import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Machine } from './machine.entity';
import { IotDeviceType } from './iot-device-type.entity';
import { MeasuredData } from './measured-data.entity';
import { User } from './user.entity';

@Entity('iot_device')
export class IotDevice {
  @PrimaryGeneratedColumn()
  iot_device_id: number;

  @Column()
  iot_device_type_id: number;

  @Column()
  machine_id: number;

  @Column()
  device_name: string;

  @Column()
  serial_number: string;

  @Column()
  firmware_version: string;

  @Column()
  installation_date: Date;

  @Column()
  last_calibration_date: Date;

  @Column()
  next_calibration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @ManyToOne(() => Machine, machine => machine.iotDevices)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @ManyToOne(() => IotDeviceType, deviceType => deviceType.iotDevices)
  @JoinColumn({ name: 'iot_device_type_id' })
  deviceType: IotDeviceType;

  @OneToMany(() => MeasuredData, measuredData => measuredData.iotDevice)
  measuredData: MeasuredData[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;
}