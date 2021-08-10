import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserToken } from '../auth/decorators/user-token.decorator';
import { MyGuard } from '../auth/guard/my.guard';
import { UserGuard } from '../auth/guard/user.guard';
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
    @Query('_id') _id?: string,
    @Query('user') user?: string,
    @Query('publicationType') publicationType?: TPublicationType,
  ): Promise<PublicationDTO[]> {
    if (_id || user || publicationType) {
      return this.publicationService.search(token, {
        _id,
        user,
        publicationType,
      });
    } else {
      return this.publicationService.search(token);
    }
  }

  @Post('/')
  @UseGuards(UserGuard)
  public create(
    @Body() publicationCreate: PublicationCreateDTO,
    @UserToken() token?: string,
  ): Promise<PublicationDTO> {
    return this.publicationService.create(token, publicationCreate);
  }

  @Put('/:publicationId')
  @UseGuards(MyGuard)
  public update(
    @Param('publicationId') publicationId: string,
    @Body() publicationUpdate: PublicationUpdateDTO,
  ): Promise<PublicationDTO> {
    return this.publicationService.update(publicationId, publicationUpdate);
  }

  @Delete('/:publicationId')
  public delete(
    @Param('publicationId') publicationId: string,
  ): Promise<PublicationDTO> {
    return this.publicationService.delete(publicationId);
  }
}
