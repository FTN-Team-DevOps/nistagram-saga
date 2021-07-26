import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('Activity')
    private readonly activityClient: ClientProxy,
  ) {}

  async test() {
    const ok = await this.activityClient.send('activities-get', {}).toPromise();
    return ok;
  }
}
