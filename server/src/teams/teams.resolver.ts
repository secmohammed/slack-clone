import { Resolver, Query } from '@nestjs/graphql';

import { TeamEntity } from './team.entity';
import { TeamService } from './team.service';

@Resolver(() => TeamEntity)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [TeamEntity])
  teams() {
    return this.teamService.get();
  }
}
