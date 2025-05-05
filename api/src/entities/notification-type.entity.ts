import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Notification } from './notification.entity';

@Entity('notification_types')
export class NotificationType {
  @PrimaryGeneratedColumn()
  notification_type_id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  template: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Notification, notification => notification.notificationType)
  notifications: Notification[];
}