import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Division } from './division.entity';
import { User } from './user.entity';

@Entity('factory')
export class Factory {
  @PrimaryGeneratedColumn()
  factory_id: number;

  @Column()
  factory_name: string;

  @Column()
  location: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postal_code: string;

  @Column()
  gps_coordinates: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  total_capacity: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  total_consumption: number;

  @Column()
  contact_person: string;

  @Column()
  contact_email: string;

  @Column()
  contact_phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @OneToMany(() => Division, division => division.factory)
  divisions: Division[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;
}