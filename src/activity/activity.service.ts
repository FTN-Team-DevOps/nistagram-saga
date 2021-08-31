import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { Activity } from './dto/activity';
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
    const activities = (await this.activityClient
      .send('activities-get', searchParams)
      .toPromise()) as Activity[];

    const userIds = activities.map((activity) => activity.user);

    const users = await this.userService.getByIds(userIds);

    if (!activities) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return activities.map((activity, index) => ({
      ...activity,
      user: users[index],
    }));
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
    return { ...createdActivity, user: currentUser };
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
    return { ...updatedActivity, user: currentUser };
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
