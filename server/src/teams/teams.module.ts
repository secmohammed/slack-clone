import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './team.entity';
import { TeamResolver } from './teams.resolver';
import { TeamService } from './team.service';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, UserEntity])],
  providers: [TeamResolver, TeamService],
})
export class TeamsModule {}
