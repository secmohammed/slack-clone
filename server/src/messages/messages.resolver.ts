import { Resolver, Query } from '@nestjs/graphql';

import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageEntity])
  messages() {
    return this.messageService.get();
  }
}
