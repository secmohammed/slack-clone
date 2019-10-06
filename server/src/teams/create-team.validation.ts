import { InputType, Field } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';
@InputType()
export class CreateTeam {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
