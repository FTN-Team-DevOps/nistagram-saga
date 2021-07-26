import { Test, TestingModule } from '@nestjs/testing';
import { PublicationController } from './publication/publication.controller';
import { PublicationService } from './publication/publication.service';

describe('PublicationController', () => {
  let publicationController: PublicationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublicationController],
      providers: [PublicationService],
    }).compile();

    publicationController = app.get<PublicationController>(
      PublicationController,
    );
  });

  describe('root', () => {
    it('should return "test"', () => {
      expect(() => publicationController.search('test')).toBe('test');
    });
  });
});
