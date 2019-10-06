import { InputType, Field } from 'type-graphql';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class UpdateChannel {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  channelId: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
