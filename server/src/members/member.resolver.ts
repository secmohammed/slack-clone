import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { CreateMember } from './create-member.validation';
import { DestroyMember } from './destroy-member.validation';
import { IsID } from '../shared/validations/id.validation';
import { MemberService } from './member.service';
import { UserDTO } from '../users/user.dto';
import { pubSub } from '../shared/utils/pubsub';

@Resolver('member')
export class MemberResolver {
  constructor(private readonly members: MemberService) {}
  @UseGuards(new AuthGuard())
  @Mutation(() => UserDTO)
  async storeMember(
    @Args('data') data: CreateMember,
    @Context('user') { id }: IsID,
  ) {
    const userAddedToChannel = await this.members.store(data, id);
    pubSub.publish('userAddedToChannel', { userAddedToChannel });
    return userAddedToChannel;
  }
  @UseGuards(new AuthGuard())
  @Mutation(() => UserDTO)
  deleteMember(
    @Args('data') data: DestroyMember,
    @Context('user') { id }: IsID,
  ) {
    return this.members.destroy(data, id);
  }
}
