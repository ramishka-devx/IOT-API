import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IotDevice } from './iot-device.entity';
import { Parameter } from './parameter.entity';

@Entity('iot_device_type')
export class IotDeviceType {
  @PrimaryGeneratedColumn()
  iot_device_type_id: number;

  @Column()
  title: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => IotDevice, iotDevice => iotDevice.deviceType)
  iotDevices: IotDevice[];

  @OneToMany(() => Parameter, parameter => parameter.iotDeviceType)
  parameters: Parameter[];
}