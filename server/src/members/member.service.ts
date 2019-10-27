import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TeamEntity } from '../teams/team.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}
  async store({ teamId, email }, id) {
    // check if auth user belongs to this channel | auth user is a member of the channel.
    const team = await this.teams.findOneOrFail(
      { id: teamId },
      { relations: ['members', 'channels', 'owner'] },
    );
    const user = await this.users.findOneOrFail({ email });
    if (team.members.some(member => member.id === id)) {
      team.members.push(user);
      this.teams.save(team);
      return user;
    }
    throw new HttpException(
      'You are not a member of this channel to add others',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async destroy({ teamId, userId }, id) {
    let team = await this.teams.findOneOrFail(
      { id: teamId },
      { relations: ['members', 'channels', 'owner'] },
    );
    // if team members has the user that should leave, and the authenticated user who tries to remove this user is also a member.
    if (
      team.members.some(member => member.id === userId) &&
      team.members.some(member => member.id === id)
    ) {
      team.members = team.members.filter(member => member.id !== userId);
      this.teams.save(team);
      return team;
    }
    throw new HttpException(
      'You are not a member of this channel to add others',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
