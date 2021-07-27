export type TActivityAction =
  | 'like'
  | 'dislike'
  | 'favorite'
  | 'deleted'
  | 'comment'
  | 'message'
  | 'tag'
  | 'location';

export class ActivityDTO {
  _id: string;
  user: string; // IUser['id'];
  targetUser?: string; // User['id']; // meesage, tag
  publication?: string; // IPublication['id']; //sve sem message
  text?: string; // message, tag, comment, location
  action: TActivityAction;
  taimeStamp: string; //mmddyyyy
}
