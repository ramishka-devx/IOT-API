import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Factory } from './factory.entity';
import { UserDashboard } from './user-dashboard.entity';
import { Notification } from './notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  phone: string;

  @Column()
  role_id: number;

  @Column()
  factory_id: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Factory)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToMany(() => UserDashboard, userDashboard => userDashboard.user)
  dashboards: UserDashboard[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;
}