import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './team.entity';
import { TeamResolver } from './teams.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  providers: [TeamResolver, TeamService],
})
export class TeamsModule {}
