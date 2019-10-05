import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ChannelEntity as Channel } from '../channels/channel.entity';
import { UserEntity as User } from '../users/user.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity('teams')
@ObjectType()
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  name: string;
  @OneToMany(type => Channel, channel => channel.team)
  @Field(() => [Channel])
  channels: Channel[];
  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  @Field(() => [User])
  members: User[];

  @ManyToOne(type => User, user => user.teams)
  @Field(() => User)
  owner: User;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
