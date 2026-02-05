import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionService } from '../discussion.service';
import { DiscussionController } from '../discussion.controller';


describe('DiscussionController', () => {
  let controller: DiscussionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionController],
      providers: [DiscussionService],
    }).compile();

    controller = module.get<DiscussionController>(DiscussionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
