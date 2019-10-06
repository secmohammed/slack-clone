import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class DestroyMember {
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
