import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Factory } from './factory.entity';
import { DivisionType } from './division-type.entity';
import { Machine } from './machine.entity';
import { User } from './user.entity';

@Entity('division')
export class Division {
  @PrimaryGeneratedColumn()
  division_id: number;

  @Column()
  title: string;

  @Column()
  factory_id: number;

  @Column()
  division_type_id: number;

  @Column()
  parent_id: number;

  @Column({ default: 1 })
  level: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  capacity: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  power_consumption: number;

  @Column()
  manager_name: string;

  @Column()
  manager_contact: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @ManyToOne(() => Factory, factory => factory.divisions)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @ManyToOne(() => DivisionType, divisionType => divisionType.divisions)
  @JoinColumn({ name: 'division_type_id' })
  divisionType: DivisionType;

  @ManyToOne(() => Division, division => division.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Division;

  @OneToMany(() => Division, division => division.parent)
  children: Division[];

  @OneToMany(() => Machine, machine => machine.division)
  machines: Machine[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;
}