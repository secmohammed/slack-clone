import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from '../shared/config';
import { TeamEntity as Team } from '../teams/team.entity';
import { MessageEntity as Message } from '../messages/message.entity';
import { ObjectType, ID, Field } from 'type-graphql';

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
