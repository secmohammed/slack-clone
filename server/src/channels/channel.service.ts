import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { ChannelEntity } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channels: Repository<ChannelEntity>,
  ) {}
  async get() {
    return this.channels.find();
  }
}
