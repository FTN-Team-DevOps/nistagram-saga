import { Controller, Get, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  public search(@Query('test') test?: string): Promise<string> {
    return this.publicationService.test(test);
  }
}
