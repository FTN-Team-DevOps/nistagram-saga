import { TActivityAction } from './activity.dto';

export class ActivitySearchDTO {
  _id?: string;
  user?: string; // IUser['id'];
  targetUser?: string; // User['id']; // meesage, tag
  publication?: string; // IPublication['id']; //sve sem message
  action?: TActivityAction;
}
