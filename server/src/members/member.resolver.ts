import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { CreateMember } from './create-member.validation';
import { DestroyMember } from './destroy-member.validation';
import { IsID } from '../shared/validations/id.validation';
import { MemberService } from './member.service';
import { UserDTO } from '../users/user.dto';

@Resolver('member')
export class MemberResolver {
  constructor(private readonly members: MemberService) {}
  @UseGuards(new AuthGuard())
  @Mutation(() => UserDTO)
  storeMember(@Args('data') data: CreateMember, @Context('user') { id }: IsID) {
    return this.members.store(data, id);
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
