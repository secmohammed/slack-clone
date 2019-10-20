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

@Entity('notifications')
@ObjectType()
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column('text')
  @Field()
  description: string;

  @ManyToOne(type => User, user => user.notifications)
  @Field(() => User)
  user: User;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
