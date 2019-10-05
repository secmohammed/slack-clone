import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelsModule } from './channels/channels.module';
import { GraphQLErrorFilter } from './shared/filters/graphql-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { MessagesModule } from './messages/messages.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';

const ormconfig = require('../ormconfig.json');

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      installSubscriptionHandlers: true,
    }),

    TypeOrmModule.forRoot(ormconfig[0]),
    UsersModule,
    ChannelsModule,
    TeamsModule,
    MessagesModule,
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
