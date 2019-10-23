import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [NotificationService, NotificationResolver],
})
export class NotificationsModule {}
