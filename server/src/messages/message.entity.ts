import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { UserEntity as User } from '../users/user.entity';
import { ChannelEntity as Channel } from '../channels/channel.entity';
import { ObjectType, ID, Field } from 'type-graphql';

@Entity('messages')
@ObjectType()
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  text: string;
  @ManyToOne(() => User, user => user.messages)
  @Field(() => User)
  user: User;
  @ManyToOne(() => Channel, channel => channel.messages)
  @Field(() => Channel)
  channel: Channel;
}
