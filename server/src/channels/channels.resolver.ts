import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';
import { CreateChannel } from './create-channel.validation';
import { DeleteChannel } from './delete-channel.validation';
import { IsID } from '../shared/validations/id.validation';
import { UpdateChannel } from './update-channel.validation';

@Resolver(() => ChannelEntity)
export class ChannelsResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => [ChannelEntity])
  channels() {
    return this.channelService.get();
  }
  @Mutation(() => ChannelEntity)
  @UseGuards(new AuthGuard())
  createChannel(
    @Args('data') { name, published, teamId }: CreateChannel,
    @Context('user') { id }: IsID,
  ) {
    return this.channelService.store({ name, published, teamId }, id);
  }
  @Mutation(() => ChannelEntity)
  @UseGuards(new AuthGuard())
  updateChannel(
    @Args('data') { name, channelId }: UpdateChannel,
    @Context('user') { id }: IsID,
  ) {
    return this.channelService.update({ name, channelId }, id);
  }
  @Mutation(() => ChannelEntity)
  @UseGuards(new AuthGuard())
  deleteChannel(
    @Args('data') { channelId }: DeleteChannel,
    @Context('user') { id }: IsID,
  ) {
    return this.channelService.destroy({ channelId }, id);
  }
}
