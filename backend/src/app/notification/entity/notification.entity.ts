import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NOTIFICATION_TYPE } from '@app/notification/constants/notification.constants';
import {
  CommnetAddedContents,
  GroupFailedContents,
  GroupSucceedContents,
} from '@app/notification/entity/notification-contents';
import { GroupArticle } from '@app/group-article/entity/group-article.entity';
import { Comment } from '@src/app/comment/entity/comment.entity';
import { User } from '@app/user/entity/user.entity';
import { UserNotification } from '@app/notification/entity/user-notification.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  type: NOTIFICATION_TYPE;

  @Column({ type: 'json' })
  contents: GroupSucceedContents | GroupFailedContents | CommnetAddedContents;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  static createGroupSucceedNotification(groupArticle: GroupArticle) {
    const notification = new Notification();
    notification.type = NOTIFICATION_TYPE.GROUP_SUCCEED;
    notification.contents = {
      title: '모임이 성사되었어요',
      subTitle: groupArticle.title,
      groupArticleId: groupArticle.id,
    };
    return notification;
  }

  static createGroupFailedNotification(groupArticle: GroupArticle) {
    const notification = new Notification();
    notification.type = NOTIFICATION_TYPE.GROUP_FAILED;
    notification.contents = {
      title: '모임이 무산되었어요',
      subTitle: groupArticle.title,
      groupArticleId: groupArticle.id,
    };
    return notification;
  }

  static async createCommentAddedNotification(
    groupArticle: GroupArticle,
    comment: Comment,
  ) {
    const notification = new Notification();
    notification.type = NOTIFICATION_TYPE.COMMENT_ADDED;
    notification.contents = {
      title: groupArticle.title,
      subTitle: `${(await comment.user).userName}: ${comment.contents}`,
      groupArticleId: groupArticle.id,
    };
    return notification;
  }

  createUserNotifications(users: User[]) {
    return users.map((user) => UserNotification.create(user, this));
  }
}
