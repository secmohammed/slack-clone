import { UserDTO } from './user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID, Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { LoginUser } from './login-user.validation';
import { RegisterUser } from './register-user.validation';
import { UserEntity as User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async get() {
    return this.users.find();
  }
  async login({ email, password }: LoginUser) {
    const user = await this.users.findOneOrFail({
      where: { email },
    });
    if (!compareSync(password, user.password)) {
    }
  }
  async register({
    password,
    password_confirmation,
    email,
    name,
  }: RegisterUser): Promise<UserDTO> {
    if (password != password_confirmation) {
      throw new NotFoundException(
        'Password and password_confirmation should match',
      );
    }

    const count = await this.users.count({
      where: {
        email,
      },
    });
    if (count) {
      throw new NotFoundException('email exists, please pick up another one.');
    }
    let user = await this.users.create({
      name,
      email,
      password,
    });
    user = await this.users.save(user);
    return user.toResponseObject();
  }

  async me({ id }: any): Promise<UserDTO> {
    const user = await this.users.findOneOrFail(id);
    return user.toResponseObject(false);
  }
}
