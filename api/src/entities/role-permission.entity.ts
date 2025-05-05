import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn()
  role_permission_id: number;

  @Column()
  role_id: number;

  @Column()
  permission_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by: number;

  @ManyToOne(() => Role, role => role.rolePermissions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;
}