import { Test, TestingModule } from '@nestjs/testing';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

describe('PublicationController', () => {
  let controller: PublicationController;

  // const mockPublicationService = {
  //   test: jest.fn(() => {
  //     return 'test';
  //   }),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationController],
      providers: [PublicationService],
    }).compile();
    // .overrideProvider(PublicationService)
    // .useValue(mockPublicationService)

    controller = module.get<PublicationController>(PublicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return "test"', () => {
  //   expect(() => publicationController.search()).toBe('test');
  // });
});
