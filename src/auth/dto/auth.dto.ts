export type TRole = 'admin' | 'user';

export class AuthDTO {
  _id: string;
  user: string;
  password: string;
  email: string;
  token: string;
  role: TRole;
}
