import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMember {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teamId: string;
}
