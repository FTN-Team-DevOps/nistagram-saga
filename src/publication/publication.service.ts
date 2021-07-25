import { Injectable, NotFoundException, HttpException } from '@nestjs/common';

@Injectable()
export class PublicationService {
  // constructor() {}

  async test(test: string, errorMessage?: HttpException | null) {
    if (!test && errorMessage !== null) {
      throw errorMessage || new NotFoundException('Test not found');
    }

    return test;
  }
}
