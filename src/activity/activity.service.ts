import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { ActivityCreateDTO } from './dto/activity-create.dto';
import { ActivitySearchDTO } from './dto/activity-search.dto';
import { ActivityUpdateDTO } from './dto/activity-update.dto';
import { ActivityDTO } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('Activity') private readonly activityClient: ClientProxy,
    private readonly userService: UserService,
  ) {}

  async search(searchParams?: ActivitySearchDTO): Promise<ActivityDTO[]> {
    const publications = await this.activityClient
      .send('activities-get', searchParams)
      .toPromise();
    if (!publications) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return publications;
  }

  async create(
    token: string,
    activityCreat: ActivityCreateDTO,
  ): Promise<ActivityDTO> {
    const currentUser = await this.userService.currentUser(token);
    const createdActivity = await this.activityClient
      .send('activities-create', { ...activityCreat, user: currentUser._id })
      .toPromise();
    if (!createdActivity) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return createdActivity;
  }

  async update(
    token: string,
    activityId: string,
    activityUpdate: ActivityUpdateDTO,
  ): Promise<ActivityDTO> {
    const currentUser = await this.userService.currentUser(token);
    const updatedActivity = await this.activityClient
      .send('activities-update', {
        _id: activityId,
        data: { ...activityUpdate, user: currentUser._id },
      })
      .toPromise();
    if (!updatedActivity) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return updatedActivity;
  }

  async delete(token: string, activityId: string): Promise<ActivityDTO> {
    const currentUser = await this.userService.currentUser(token);
    const deletedActivity = await this.activityClient
      .send('activities-update', {
        _id: activityId,
        user: currentUser._id,
      })
      .toPromise();
    if (!deletedActivity) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return deletedActivity;
  }
}
