import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { CreateMessage } from './create-message.validation';
import { DestroyMessage } from './destroy-message.validation';
import { IsID } from '../shared/validations/id.validation';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';
import { UpdateMessage } from './update-message.validation';
import { pubSub } from '../shared/utils/pubsub';
@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageEntity])
  @UseGuards(new AuthGuard())
  messages(@Context('user') { id }: IsID) {
    return this.messageService.get();
  }
  @Mutation(() => MessageEntity)
  @UseGuards(new AuthGuard())
  async createMessage(
    @Args('data') data: CreateMessage,
    @Context('user') { id }: IsID,
  ) {
    const message = await this.messageService.store(data, id);
    await pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }
  @Mutation(() => MessageEntity)
  @UseGuards(new AuthGuard())
  updateMessage(
    @Args('data') data: UpdateMessage,
    @Context('user') { id }: IsID,
  ) {
    return this.messageService.update(data, id);
  }
  @Mutation(() => MessageEntity)
  @UseGuards(new AuthGuard())
  destroyMessage(
    @Args('data') data: DestroyMessage,
    @Context('user') { id }: IsID,
  ) {
    return this.messageService.destroy(data, id);
  }
}
