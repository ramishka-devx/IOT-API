import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserDashboard } from './user-dashboard.entity';

@Entity('dashboard_widgets')
export class DashboardWidget {
  @PrimaryGeneratedColumn()
  widget_id: number;

  @Column()
  widget_name: string;

  @Column()
  widget_type: string;

  @Column('json')
  config: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserDashboard, userDashboard => userDashboard.widget)
  userDashboards: UserDashboard[];
}