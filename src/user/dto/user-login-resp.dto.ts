import { TRole } from '../../auth/dto/auth.dto';
import { UserDTO } from './user-dto';

export class UserLoginRespDTO {
  role: TRole;
  token: string;
  user: UserDTO;
}
