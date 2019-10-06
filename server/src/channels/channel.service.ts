import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ChannelEntity } from './channel.entity';
import { TeamEntity } from '../teams/team.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ChannelService {
  private team;
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channels: Repository<ChannelEntity>,
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}
  async get() {
    return this.channels.find({
      relations: ['messages', 'team', 'messages.user'],
    });
  }
  async store({ teamId, name, published }, id) {
    if (await this.teamHasChannel(teamId, name)) {
      throw new HttpException(
        'You cannot create a channel due to it already exists for your team.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // check if authenticated user is a member of the current team.
    if (await this.userIsInTeam(teamId, id)) {
      const channel = await this.channels.create({
        name,
        public: published,
      });
      channel.owner = await this.users.findOneOrFail({ id });
      channel.team = this.team;
      return this.channels.save(channel);
    }
    throw new HttpException(
      'Unauthorized Attempt, you are not a member of this team to create a channel',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async update({ channelId, name }, id) {
    const channel = await this.channels.findOneOrFail(
      { id: channelId },
      { relations: ['messages', 'team', 'messages.user', 'owner'] },
    );
    if (
      !(await this.teamHasChannel(channel.team.id, channel.name)) ||
      channel.owner.id !== id
    ) {
      throw new HttpException(
        'Unauthorized Attempt, Your team does not have this channel to update.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (await this.userIsInTeam(channel.team.id, id)) {
      await this.channels.update(
        { id: channel.id },
        {
          name,
        },
      );
      return channel;
    }
    throw new HttpException(
      'Unauthorized Attempt, you are not a member of this team to update a channel',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async destroy({ channelId }, id) {
    const channel = await this.channels.findOneOrFail(
      { id: channelId },
      { relations: ['owner', 'team'] },
    );
    if (
      channel.owner.id !== id ||
      !(await this.userIsInTeam(channel.team.id, id))
    ) {
      throw new HttpException(
        'Unauthorized Attempt, you are not a member of this team to remove a channel',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.channels.delete(channel.id);
    return channel;
  }
  private async teamHasChannel(teamId, name) {
    const team = await this.teams.findOneOrFail(
      { id: teamId },
      { relations: ['channels'] },
    );
    return team.channels.some(channel => channel.name === name);
  }
  private async userIsInTeam(teamId, id) {
    this.team = await this.teams.findOneOrFail(
      { id: teamId },
      { relations: ['members'] },
    );
    return this.team.members.some(member => member.id === id);
  }
}
