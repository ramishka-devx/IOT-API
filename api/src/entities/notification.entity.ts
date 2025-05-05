import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationType } from './notification-type.entity';
import { User } from './user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column()
  notification_type_id: number;

  @Column()
  user_id: number;

  @Column('text')
  message: string;

  @Column({ default: false })
  is_read: boolean;

  @Column()
  read_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => NotificationType, notificationType => notificationType.notifications)
  @JoinColumn({ name: 'notification_type_id' })
  notificationType: NotificationType;

  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;
}