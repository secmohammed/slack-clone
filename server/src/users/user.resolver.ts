import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/middlewares/auth.guard';
import { LoginUser } from './login-user.validation';
import { RegisterUser } from './register-user.validation';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  users() {
    return this.userService.get();
  }

  @Mutation(() => UserDTO)
  async login(@Args('data') data: LoginUser): Promise<UserDTO> {
    return this.userService.login(data);
  }
  @Mutation(() => UserEntity)
  register(@Args('data') data: RegisterUser) {
    return this.userService.register(data);
  }

  @Query(() => UserEntity)
  @UseGuards(new AuthGuard())
  me(@Context('user') { id }) {
    return this.userService.me(id);
  }
}
