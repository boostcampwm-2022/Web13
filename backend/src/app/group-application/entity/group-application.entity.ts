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
import { GROUP_APPLICATION_STATUS } from '@src/app/group-article/constants/group-article.constants';
import { GroupApplicationStatusTransformer } from '@app/group-application/type/group-application-status.transformer';

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
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: 'enum형 - GROUP_APPLICATION_STATUS 또는 null',
    transformer: new GroupApplicationStatusTransformer(),
  })
  status: GROUP_APPLICATION_STATUS;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  static create(user: User, group: Group) {
    const groupApplication = new GroupApplication();
    groupApplication.userId = user.id;
    groupApplication.groupId = group.id;
    groupApplication.status = GROUP_APPLICATION_STATUS.REGISTER;
    return groupApplication;
  }

  cancel() {
    this.status = GROUP_APPLICATION_STATUS.CANCEL;
    this.deletedAt = new Date();
  }
}
