import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { PublicationCreateDTO } from './dto/publication-create.dto';
import { PublicationSearchDTO } from './dto/publication-search.dto';
import { PublicationUpdateDTO } from './dto/publication-update.dto';
import { PublicationDTO } from './dto/publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @Inject('Publication')
    private readonly publicationClient: ClientProxy,
    private readonly userService: UserService,
  ) {}

  async search(
    token?: string,
    searchParams?: PublicationSearchDTO,
  ): Promise<PublicationDTO[]> {
    let publications: PublicationDTO[];
    if (!searchParams) {
      const relevatnUsers = this.userService.getRelevant(token);
      publications = await this.publicationClient
        .send('publications-get', { relevatnUsers })
        .toPromise();
    } else {
      publications = await this.publicationClient
        .send('publications-get', searchParams)
        .toPromise();
    }

    if (!publications) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return publications;
  }

  async create(
    token: string,
    piblicationCreate: PublicationCreateDTO,
  ): Promise<PublicationDTO> {
    const currentUser = await this.userService.currentUser(token);
    const createdPublication = await this.publicationClient
      .send('publications-create', {
        ...piblicationCreate,
        user: currentUser._id,
      })
      .toPromise();

    if (!createdPublication) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return createdPublication;
  }

  async update(
    publicationId: string,
    piblicationUpdate: PublicationUpdateDTO,
  ): Promise<PublicationDTO> {
    const updatedPublication = await this.publicationClient
      .send('publications-update', {
        _id: publicationId,
        data: {
          ...piblicationUpdate,
        },
      })
      .toPromise();

    if (!updatedPublication) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return updatedPublication;
  }

  async delete(publicationId: string): Promise<PublicationDTO> {
    const deletedPublication = await this.publicationClient
      .send('publications-delete', publicationId)
      .toPromise();
    if (!deletedPublication) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return deletedPublication;
  }
}
