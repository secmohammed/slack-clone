import { UserEntity as User } from '../users/user.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class NotificationPayload {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;
  @Field()
  created_at: Date;
  @Field()
  updated_at: Date;
}
