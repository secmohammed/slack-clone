import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { CreateTeam } from './create-team.validation';
import { DeleteTeam } from './delete-team.validation';
import { IsID } from '../shared/validations/id.validation';
import { TeamEntity } from './team.entity';
import { TeamService } from './team.service';

@Resolver(() => TeamEntity)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [TeamEntity])
  teams() {
    return this.teamService.get();
  }
  @Query(() => TeamEntity)
  showTeam(@Args('data') { id }: IsID) {
    return this.teamService.show(id);
  }
  @Mutation(() => TeamEntity)
  @UseGuards(new AuthGuard())
  createTeam(
    @Args('data') { name }: CreateTeam,
    @Context('user') { id }: IsID,
  ) {
    return this.teamService.store({ name }, id);
  }
  @Mutation(() => TeamEntity)
  @UseGuards(new AuthGuard())
  deleteTeam(
    @Args('data') { teamId }: DeleteTeam,
    @Context('user') { id }: IsID,
  ) {
    return this.teamService.destroy({ teamId }, id);
  }
}
