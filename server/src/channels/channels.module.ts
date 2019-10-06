import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';
import { ChannelsResolver } from './channels.resolver';
import { TeamEntity } from '../teams/team.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity, TeamEntity, UserEntity])],
  providers: [ChannelsResolver, ChannelService],
})
export class ChannelsModule {}
