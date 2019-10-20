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
// import { ResolverFilterData, Subscription } from 'type-graphql';
import { IsID } from '../shared/validations/id.validation';
import { NotificationEntity } from './notification.entity';
@Resolver()
export class NotificationResolver {
  @Subscription(returns => NotificationEntity, {
    filter: (payload, variables) => {
      console.log(payload, variables);
      return true;
    },
  })
  @UseGuards(new AuthGuard())
  messageAdded(@Context('user') { id }: IsID) {
    return pubSub.asyncIterator('messageAdded');
  }
}
