import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsResolver } from './channels.resolver';

describe('ChannelsResolver', () => {
  let resolver: ChannelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsResolver],
    }).compile();

    resolver = module.get<ChannelsResolver>(ChannelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
