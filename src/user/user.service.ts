import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from '../auth/auth.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserDTO } from './dto/user-dto';
import { UserLoginRespDTO } from './dto/user-login-resp.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserSearchDTO } from './dto/user-search.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('User') private readonly userClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  async currentUser(token: string): Promise<UserDTO> {
    const auth = await this.authService.currentUser(token);
    if (!auth) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    const users = await this.userClient
      .send('users-get', { _id: auth.user })
      .toPromise();
    if (!users) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return users[0];
  }

  async search(searchParams: UserSearchDTO): Promise<UserDTO[]> {
    const users = await this.userClient
      .send('users-get', searchParams)
      .toPromise();

    if (!users) {
      throw new InternalServerErrorException('Something went wrong!');
    }

    return users;
  }

  async create(userCreate: UserCreateDTO): Promise<UserDTO> {
    const createdUser = await this.userClient
      .send('users-create', {
        username: userCreate.username,
        email: userCreate.email,
        name: userCreate.name,
        phone: userCreate.phone,
        gender: userCreate.gender,
        siteUrl: userCreate.siteUrl,
        biography: userCreate.biography,
        picture: userCreate.picture,
        private: userCreate.private,
        taggable: userCreate.taggable,
      })
      .toPromise();

    if (!createdUser) {
      throw new InternalServerErrorException('Something went wrong!');
    }

    await this.authService.create({
      user: createdUser._id,
      password: userCreate.password,
      email: userCreate.email,
      role: 'user',
    });

    return createdUser;
  }

  async logIn(logInDTO: UserLoginDTO): Promise<UserLoginRespDTO> {
    const auth = await this.authService.logIn(logInDTO);

    if (!auth) {
      throw new BadRequestException('Bad credentials!');
    }

    const users = await this.userClient
      .send('users-get', { _id: auth.user, private: true })
      .toPromise();

    if (!users || !users[0]) {
      throw new InternalServerErrorException('Something went wrong!');
    }

    return {
      token: auth.token,
      role: auth.role,
      user: users[0],
    };
  }

  async update(userId: string, userUpdate: UserUpdateDTO): Promise<UserDTO> {
    const updatedUser = await this.userClient
      .send('users-update', { _id: userId, data: userUpdate })
      .toPromise();

    if (!updatedUser) {
      throw new InternalServerErrorException('Something went wrong!');
    }

    if (userUpdate.password) {
      await this.authService.update(userId, { password: userUpdate.password });
    }
    return updatedUser;
  }

  async delete(userId: string): Promise<UserDTO> {
    const deletedUser = await this.userClient
      .send('users-delete', userId)
      .toPromise();
    if (!deletedUser) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return deletedUser;
  }

  async getRelevant(token?: string) {
    const publicUsers = (await this.search({ private: false })).map(
      (user) => user._id,
    );
    if (token) {
      const currentUser = await this.currentUser(token);
      if (currentUser) {
        throw new InternalServerErrorException('Something went wrong');
      }
      // const followedUsers = (await followService.search({subscriber: currentUser._id})
      // .map(follow => follow.observer);
      // return [...publicUser, ...followedUsers];
      return publicUsers.filter((userId) => userId !== currentUser._id);
    }
    return publicUsers;
  }
}
