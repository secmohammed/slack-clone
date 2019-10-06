import { ObjectType, ID, Field } from 'type-graphql';
import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { MessageEntity as Message } from '../messages/message.entity';
import { TeamEntity as Team } from '../teams/team.entity';
import { UserEntity as User } from '../users/user.entity';

@Entity('channels')
@ObjectType()
export class ChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  name: string;
  @Column('boolean')
  @Field()
  public: boolean;
  @ManyToOne(type => User, user => user.channels)
  @Field(() => User)
  owner: User;
  @ManyToOne(type => Team, team => team.channels)
  @Field(() => Team)
  team: Team;
  @OneToMany(() => Message, messages => messages.channel)
  @Field(() => [Message])
  messages: Message[];
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  toResponseObject() {
    const { id, name, created_at, updated_at } = this;
    return {
      id,
      name,
      created_at,
      updated_at,
    };
  }
}
