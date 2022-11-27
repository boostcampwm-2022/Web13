import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '@app/group-article/entity/group.entity';
import { User } from '@app/user/entity/user.entity';

@Entity()
@Unique('UNIQUE_USER_ID_GROUP_ID_STATUS', ['userId', 'groupId', 'status'])
export class GroupApplication {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  userId: number;

  @ManyToOne(() => User, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: Promise<User>;

  @Column({ unsigned: true })
  groupId: number;

  @ManyToOne(() => Group, { lazy: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'group_id' })
  group: Promise<Group>;

  @Column({
    type: 'tinyint',
    precision: 1,
    nullable: true,
    comment: '삭제되었으면 NULL 아니면 1',
  })
  status: number | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}