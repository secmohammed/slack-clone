import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TeamEntity } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,
  ) {}
  async get() {
    return this.teams.find();
  }
}
