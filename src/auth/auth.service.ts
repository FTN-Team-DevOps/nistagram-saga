import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { AuthCreateDTO } from './dto/auth-create.dto';
import { AuthUpdateDTO } from './dto/auth-update.dto';
import { AuthDTO, TRole } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Auth')
    private readonly authClient: ClientProxy,
  ) {}

  async logIn(authDTO: UserLoginDTO): Promise<AuthDTO> {
    const auth = await this.authClient.send('auth-log-in', authDTO).toPromise();
    if (auth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return auth;
  }

  async currentUser(token: string): Promise<AuthDTO> {
    const auth = await this.authClient
      .send('auth-find-by-token', token)
      .toPromise();
    if (auth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return auth;
  }

  async create(authCreate: AuthCreateDTO): Promise<AuthDTO> {
    const createdAuth = await this.authClient
      .send('auth-create', authCreate)
      .toPromise();
    if (createdAuth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return createdAuth;
  }

  async update(userId: string, authUpdate: AuthUpdateDTO): Promise<AuthDTO> {
    const updatedAuth = await this.authClient
      .send('auth-update', { userId, data: authUpdate })
      .toPromise();
    if (updatedAuth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return updatedAuth;
  }

  async findByUserId(userId: string): Promise<AuthDTO> {
    const auth = await this.authClient
      .send('auth-find-by-user-id', userId)
      .toPromise();
    if (auth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return auth;
  }

  async checkRole(token: string, role: TRole): Promise<boolean> {
    return this.authClient.send('auth-check-role', { role, token }).toPromise();
  }
}
