import { InputType, Field } from 'type-graphql';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class DeleteChannel {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  channelId: string;
}
