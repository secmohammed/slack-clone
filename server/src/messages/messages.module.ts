import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageEntity } from './message.entity';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService, MessageResolver],
})
export class MessagesModule {}
