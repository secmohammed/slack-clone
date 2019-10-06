import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class DestroyMessage {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Field()
  messageId: string;
}
