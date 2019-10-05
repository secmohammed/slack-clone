import { Resolver, Query } from '@nestjs/graphql';

import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';

@Resolver(() => ChannelEntity)
export class ChannelsResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => [ChannelEntity])
  channels() {
    return this.channelService.get();
  }
}
