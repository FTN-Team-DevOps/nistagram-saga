export type TGender = 'male' | 'female';

export class UserCreateDTO {
  username: string;
  password: string;
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
