import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  public search(): Promise<string> {
    return this.activityService.test();
  }
}
