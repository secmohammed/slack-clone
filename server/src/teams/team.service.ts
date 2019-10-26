import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TeamEntity } from './team.entity';
import { UserEntity } from '../users/user.entity';
import { ChannelEntity } from '../channels/channel.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channels: Repository<ChannelEntity>,
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
  async show(id) {
    return this.teams.findOneOrFail(id, {
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
    const channel = await this.channels.create({
      name: 'general',
      public: true,
    });
    team.owner = await this.users.findOneOrFail({ id });
    team.channels = [channel];
    await this.teams.save(team);
    channel.team = team;
    channel.owner = team.owner;
    await this.channels.save(channel);
    return team;
  }
  async destroy({ teamId }, id) {
    const team = await this.teams.findOneOrFail({
      where: { id: teamId, ownerId: id },
    });
    this.teams.delete({ id: teamId });
    return team;
  }
}
