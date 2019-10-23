import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from '../users/user.entity';
import { ChannelEntity } from '../channels/channel.entity';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messages: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channels: Repository<ChannelEntity>,
  ) {}
  async update(
    { text, messageId }: { text: string; messageId: string },
    userId: string,
  ) {
    const message = await this.messages.findOneOrFail(
      { id: messageId },
      {
        relations: ['user', 'channel'],
      },
    );
    if (message.user.id !== userId) {
      throw new HttpException(
        'Unauthorized Attempt, You do not own this message to edit.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.messages.update({ id: messageId }, { text });
    return message;
  }
  async destroy({ messageId }: { messageId: string }, userId: string) {
    const message = await this.messages.findOneOrFail(
      { id: messageId },
      {
        relations: ['user', 'channel'],
      },
    );
    if (message.user.id !== userId) {
      throw new HttpException(
        'Unauthorized Attempt, You do not own this message to edit.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.messages.delete({ id: messageId });
    return message;
  }
  async store(
    { text, channelId }: { text: string; channelId: string },
    id: string,
  ) {
    const user = await this.users.findOneOrFail(
      { id },
      { relations: ['teams', 'teams.channels'] },
    );

    const channel = await this.channels.findOneOrFail(
      { id: channelId },
      { relations: ['team', 'team.members'] },
    );
    if (!channel.public) {
      throw new HttpException(
        'Unauthorized Attempt, channel is not public.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const team = user.teams.filter(team =>
      team.channels.some(c => channel.id === c.id),
    );
    if (team.length) {
      let message = await this.messages.create({
        text,
      });
      message.user = user;
      message.channel = channel;
      message = await this.messages.save(message);

      return message;
    }
    throw new HttpException('Unauthorized Attempt', HttpStatus.UNAUTHORIZED);
  }
  async get() {
    return this.messages.find({
      relations: [
        'user',
        'channel',
        'user.teams',
        'user.messages',
        'user.teams.members',
        'user.teams.owner',
        'user.teams.channels',
      ],
    });
  }
}
