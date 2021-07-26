import { Controller, Get } from '@nestjs/common';
import { PublicationService } from './publication.service';

@Controller('/publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  public search(): Promise<string> {
    return this.publicationService.test();
  }
}
