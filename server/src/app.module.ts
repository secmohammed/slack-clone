import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { ChannelsModule } from './channels/channels.module';
import { GraphQLErrorFilter } from './shared/filters/graphql-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { MembersModule } from './members/members.module';
import { MessagesModule } from './messages/messages.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

const ormconfig = require('../ormconfig.json');

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, connection }) => {
        if (connection) {
          return { req: connection.context };
        }
        return { headers: req.headers };
      },
      debug: true,
      installSubscriptionHandlers: true,
    }),

    TypeOrmModule.forRoot(ormconfig[0]),
    UsersModule,
    ChannelsModule,
    TeamsModule,
    MessagesModule,
    MembersModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },

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
