import { TRole } from './auth.dto';

export class AuthCreateDTO {
  user: string; //IUser['id']
  password: string;
  email: string;
  role: TRole;
}
