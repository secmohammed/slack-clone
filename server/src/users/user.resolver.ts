import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LoginUser } from './login-user.validation';
import { RegisterUser } from './register-user.validation';
import { AuthGuard } from '../middlewares/auth.guard';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  users() {
    return this.userService.get();
  }

  @Mutation()
  login(@Args('data') data: LoginUser) {}
  @Mutation()
  register(@Args('data') data: RegisterUser) {
    return this.userService.register(data);
  }

  @Query()
  @UseGuards(new AuthGuard())
  me(@Context('user') user: any) {
    return this.userService.me(user.id);
  }
}
