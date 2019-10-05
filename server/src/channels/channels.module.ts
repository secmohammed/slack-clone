import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelEntity } from './channel.entity';
import { ChannelsResolver } from './channels.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  providers: [ChannelsResolver, ChannelService],
})
export class ChannelsModule {}
