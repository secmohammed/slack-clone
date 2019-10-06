import { IsNotEmpty, MaxLength, IsString, IsUUID } from 'class-validator';

import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateMessage {
  @IsNotEmpty()
  @Field()
  @MaxLength(255)
  text: string;
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Field()
  channelId: string;
}
