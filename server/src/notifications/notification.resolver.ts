import {
  Resolver,
  Query,
  Args,
  Mutation,
  Root,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { pubSub } from '../shared/utils/pubsub';
import { IsID } from '../shared/validations/id.validation';
import { NotificationPayload } from './notification.payload';
@Resolver()
export class NotificationResolver {
  @Subscription(returns => NotificationPayload, {
    filter: ({ messageAdded }, variables, context) => {
      return (
        context.user.id !== messageAdded.user.id &&
        messageAdded.channel.team.members.some(
          member => member.id === context.user.id,
        )
      );
    },
  })
  @UseGuards(new AuthGuard())
  messageAdded(@Context('user') { id }: IsID) {
    return pubSub.asyncIterator('messageAdded');
  }
  @Subscription(returns => NotificationPayload, {
    filter: ({ userAddedToChannel }, variables, context) => {
      const team = userAddedToChannel;
      return team.members.some(member => member.id === context.user.id);
    },
  })
  @UseGuards(new AuthGuard())
  userAddedToChannel(@Context('user') { id }: IsID) {
    console.log('here');
    return pubSub.asyncIterator('userAddedToChannel');
  }
}
