import { InputType, Field } from 'type-graphql';
import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';

@InputType()
export class CreateChannel {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  published: boolean;
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teamId: string;
}
