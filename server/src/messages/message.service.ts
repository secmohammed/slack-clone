import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { MessageEntity } from './message.entity';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly users: Repository<MessageEntity>,
  ) {}
  async get() {
    return this.users.find();
  }
}
