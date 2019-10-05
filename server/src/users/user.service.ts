import { Injectable } from '@nestjs/common';
import { ObjectID } from 'typeorm';

import { LoginUser } from './login-user.validation';
import { RegisterUser } from './register-user.validation';

@Injectable()
export class UserService {
  async get() {}
  async login(data: LoginUser) {}
  async register(data: RegisterUser) {}

  async fetchUsersByIds(ids: string[]) {}
  me(id: ObjectID) {}
}
