import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GroupSucceedEvent } from '@app/notification/event/group-succeed.event';
import { DataSource } from 'typeorm';
import { Notification } from '@app/notification/entity/notification.entity';
import { NOTIFICATION_SETTING_TYPE } from '@app/notification/constants/notification.constants';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { GroupApplicationRepository } from '@app/group-application/group-application.repository';
import { GroupFailedEvent } from '@app/notification/event/group-failed.event';
import { NotificationSettingRepository } from '@app/notification/repository/notification-setting.repository';

@Injectable()
export class NotificationListener {
  private readonly logger = new Logger(NotificationListener.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly groupApplicationRepository: GroupApplicationRepository,
    private readonly notificationSettingRepository: NotificationSettingRepository,
  ) {}

  @OnEvent('group.succeed')
  async handleGroupSucceedEvent(event: GroupSucceedEvent) {
    const { groupArticle } = event;

    try {
      const groupApplications =
        await this.groupApplicationRepository.findGroupApplications(
          groupArticle,
        );

      const targetUsers =
        await this.notificationSettingRepository.findTargetUsers({
          type: NOTIFICATION_SETTING_TYPE.GROUP,
          userIds: groupApplications.map(
            (groupApplication) => groupApplication.userId,
          ),
        });

      const notification =
        Notification.createGroupSucceedNotification(groupArticle);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(
          targetUsers.map((user) =>
            UserNotification.create(user, notification),
          ),
        );
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  @OnEvent('group.failed')
  async handleGroupFailedEvent(event: GroupFailedEvent) {
    const { groupArticle } = event;

    try {
      const groupApplications =
        await this.groupApplicationRepository.findGroupApplications(
          groupArticle,
        );

      const targetUsers =
        await this.notificationSettingRepository.findTargetUsers({
          type: NOTIFICATION_SETTING_TYPE.GROUP,
          userIds: groupApplications.map(
            (groupApplication) => groupApplication.userId,
          ),
        });

      const notification =
        Notification.createGroupFailedNotification(groupArticle);

      await this.dataSource.transaction(async (em) => {
        await em.save(notification);
        await em.save(
          targetUsers.map((user) =>
            UserNotification.create(user, notification),
          ),
        );
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}