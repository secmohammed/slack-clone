import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelEntity } from '../channels/channel.entity';
import { MessageEntity } from './message.entity';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './message.service';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity, ChannelEntity]),
  ],
  providers: [MessageService, MessageResolver],
})
export class MessagesModule {}
