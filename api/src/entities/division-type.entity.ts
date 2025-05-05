import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Division } from './division.entity';

@Entity('division_type')
export class DivisionType {
  @PrimaryGeneratedColumn()
  division_type_id: number;

  @Column()
  type_name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @Column()
  production: string;

  @OneToMany(() => Division, division => division.divisionType)
  divisions: Division[];
}