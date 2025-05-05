import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IotDeviceType } from './iot-device-type.entity';
import { MeasuredData } from './measured-data.entity';

@Entity('parameters')
export class Parameter {
  @PrimaryGeneratedColumn()
  parameter_id: number;

  @Column()
  iot_device_type_id: number;

  @Column()
  title: string;

  @Column()
  unit: string;

  @Column('decimal', { precision: 15, scale: 5 })
  min_value: number;

  @Column('decimal', { precision: 15, scale: 5 })
  max_value: number;

  @Column('decimal', { precision: 15, scale: 5 })
  normal_min: number;

  @Column('decimal', { precision: 15, scale: 5 })
  normal_max: number;

  @Column('decimal', { precision: 15, scale: 5 })
  alert_threshold: number;

  @Column('decimal', { precision: 15, scale: 5 })
  critical_threshold: number;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => IotDeviceType, deviceType => deviceType.parameters)
  @JoinColumn({ name: 'iot_device_type_id' })
  iotDeviceType: IotDeviceType;

  @OneToMany(() => MeasuredData, measuredData => measuredData.parameter)
  measuredData: MeasuredData[];
}