import { IsNotEmpty, MaxLength, IsString, IsUUID } from 'class-validator';

import { InputType, Field } from 'type-graphql';

@InputType()
export class IndexChannelMessages {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  channelId: string;
}
