import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IotDevice } from './iot-device.entity';
import { Parameter } from './parameter.entity';

@Entity('measured_data')
export class MeasuredData {
  @PrimaryGeneratedColumn()
  measured_data_id: number;

  @Column()
  iot_device_id: number;

  @Column()
  parameter_id: number;

  @Column('double')
  measured_value: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => IotDevice, iotDevice => iotDevice.measuredData)
  @JoinColumn({ name: 'iot_device_id' })
  iotDevice: IotDevice;

  @ManyToOne(() => Parameter, parameter => parameter.measuredData)
  @JoinColumn({ name: 'parameter_id' })
  parameter: Parameter;
}