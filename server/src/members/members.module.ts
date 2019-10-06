import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { TeamEntity } from '../teams/team.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, UserEntity])],

  providers: [MemberService, MemberResolver],
})
export class MembersModule {}
