import { TRole } from './auth.dto';

export class AuthUpdateDTO {
  password?: string;
  email?: string;
  role?: TRole;
}
