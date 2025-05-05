import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { DashboardWidget } from './dashboard-widget.entity';

@Entity('user_dashboard')
export class UserDashboard {
  @PrimaryGeneratedColumn()
  user_dashboard_id: number;

  @Column()
  user_id: number;

  @Column()
  widget_id: number;

  @Column()
  position: number;

  @Column('json')
  config: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.dashboards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => DashboardWidget, widget => widget.userDashboards)
  @JoinColumn({ name: 'widget_id' })
  widget: DashboardWidget;
}