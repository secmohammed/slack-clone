import { Module } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService],
})
export class UsersModule {}
