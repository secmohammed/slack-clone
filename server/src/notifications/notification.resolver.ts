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
// import { NotificationPayload } from './notification.payload';
import { MessageEntity } from '../messages/message.entity';
import { TeamEntity } from '../teams/team.entity';

@Resolver()
export class NotificationResolver {
  @Subscription(returns => MessageEntity, {
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
  @Subscription(returns => TeamEntity, {
    filter: ({ userMentionedAtTeam }, variables, context) => {
      const team = userMentionedAtTeam;
      return team.members.some(member => member.id === context.user.id);
    },
  })
  @UseGuards(new AuthGuard())
  userMentionedAtTeam(@Context('user') { id }: IsID) {
    return pubSub.asyncIterator('userMentionedAtTeam');
  }
}
