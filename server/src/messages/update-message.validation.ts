import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, MaxLength, IsString, IsUUID } from 'class-validator';

import { CreateMessage } from './create-message.validation';

@InputType()
export class UpdateMessage {
  @IsNotEmpty()
  @Field()
  @MaxLength(255)
  text: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Field()
  messageId: string;
}
