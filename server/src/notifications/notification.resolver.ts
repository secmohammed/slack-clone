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
import { NotificationEntity } from './notification.entity';
@Resolver()
export class NotificationResolver {
  @Subscription(returns => NotificationEntity, {
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
  messageAdded(@Context('user') { id }: IsID, @Root() message: any) {
    return pubSub.asyncIterator('messageAdded');
  }
}
