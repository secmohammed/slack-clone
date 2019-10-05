import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { GraphQLErrorFilter } from './filters/graphql-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UsersModule } from './users/users.module';

const ormconfig = require('../ormconfig.json');

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig[0]),

    GraphQLModule.forRoot({
      typePaths: ['./**/*.gql'],
      definitions: {
        path: join(process.cwd(), 'src/schemas/graphql.d.ts'),
      },
      context: ({ req, res }) => ({ headers: req.headers }),
      debug: true,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
