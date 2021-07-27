import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserToken } from '../auth/decorators/user-token.decorator';
import { PublicationCreateDTO } from './dto/publication-create.dto';
import { PublicationUpdateDTO } from './dto/publication-update.dto';
import { PublicationDTO, TPublicationType } from './dto/publication.dto';
import { PublicationService } from './publication.service';

@Controller('/publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  public search(
    @UserToken() token?: string,
    @Query() _id?: string,
    @Query() user?: string,
    @Query() publicationType?: TPublicationType,
  ): Promise<PublicationDTO[]> {
    return this.publicationService.search(token, {
      _id,
      user,
      publicationType,
    });
  }

  @Post('/')
  public create(
    @UserToken() token: string | undefined,
    @Body() publicationCreate: PublicationCreateDTO,
  ): Promise<PublicationDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.publicationService.create(token, publicationCreate);
  }

  @Put('/:publicationId')
  public update(
    @UserToken() token: string | undefined,
    @Param('publicationId') publicationId: string,
    @Body() publicationUpdate: PublicationUpdateDTO,
  ): Promise<PublicationDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.publicationService.update(
      token,
      publicationId,
      publicationUpdate,
    );
  }

  @Delete('/:publicationId')
  public delete(
    @UserToken() token: string | undefined,
    @Param('publicationId') publicationId: string,
  ): Promise<PublicationDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.publicationService.delete(token, publicationId);
  }
}
