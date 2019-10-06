import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class DeleteTeam {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teamId: string;
}
