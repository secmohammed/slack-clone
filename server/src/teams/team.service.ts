import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TeamEntity } from './team.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}
  async get() {
    return this.teams.find({
      relations: [
        'channels',
        'members',
        'owner',
        'channels.messages',
        'channels.messages.user',
      ],
    });
  }
  async store({ name }, id) {
    const team = await this.teams.create({
      name,
    });
    team.owner = await this.users.findOneOrFail({ id });
    return this.teams.save(team);
  }
  async destroy({ teamId }, id) {
    const team = await this.teams.findOneOrFail({
      where: { id: teamId, ownerId: id },
    });
    this.teams.delete({ id: teamId });
    return team;
  }
}
