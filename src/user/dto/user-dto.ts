import { TGender } from './user-create.dto';

export class UserDTO {
  _id: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  gender: TGender;
  siteUrl: string;
  biography: string;
  picture: string;
  private: boolean;
  taggable: boolean;
}
