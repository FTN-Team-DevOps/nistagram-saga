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
import { ActivityService } from './activity.service';
import { ActivityCreateDTO } from './dto/activity-create.dto';
import { ActivityUpdateDTO } from './dto/activity-update.dto';
import { ActivityDTO, TActivityAction } from './dto/activity.dto';

@Controller('/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  public search(
    @Query() _id?: string,
    @Query() user?: string,
    @Query() targetUser?: string,
    @Query() publication?: string,
    @Query() action?: TActivityAction,
  ): Promise<ActivityDTO[]> {
    return this.activityService.search({
      _id,
      user,
      targetUser,
      publication,
      action,
    });
  }

  @Post('/')
  public create(
    @UserToken() token: string | undefined,
    @Body() activityCreate: ActivityCreateDTO,
  ): Promise<ActivityDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.activityService.create(token, activityCreate);
  }

  @Put('/:activityId')
  public update(
    @UserToken() token: string | undefined,
    @Param('activityId') activityId: string,
    @Body() activityUpdate: ActivityUpdateDTO,
  ): Promise<ActivityDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.activityService.update(token, activityId, activityUpdate);
  }

  @Delete('/:activityId')
  public delete(
    @UserToken() token: string | undefined,
    @Param('activityId') activityId: string,
  ): Promise<ActivityDTO> {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.activityService.delete(token, activityId);
  }
}
