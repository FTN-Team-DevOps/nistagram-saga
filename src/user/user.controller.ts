import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MyGuard } from '../auth/guard/my.guard';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserDTO } from './dto/user-dto';
import { UserLoginRespDTO } from './dto/user-login-resp.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/log-in')
  public async logIn(
    @Body() userAuth: UserLoginDTO,
  ): Promise<UserLoginRespDTO> {
    const userWithToken = await this.userService.logIn(userAuth);
    return userWithToken;
  }

  @Get()
  public async search(
    @Query('_id') _id?: string,
    @Query('username') username?: string,
    @Query('private') includePrivate?: boolean,
  ): Promise<UserDTO[]> {
    const users = await this.userService.search({
      _id,
      username,
      private: includePrivate,
    });
    return users;
  }

  @Post('/')
  public async create(@Body() userCreate: UserCreateDTO): Promise<UserDTO> {
    const createdUser = await this.userService.create(userCreate);
    return createdUser;
  }

  @Put('/:userId')
  @UseGuards(MyGuard)
  public async update(
    @Param('userId') userId: string,
    @Body() userUpdate: UserUpdateDTO,
  ): Promise<UserDTO> {
    const updatedUser = await this.userService.update(userId, userUpdate);
    return updatedUser;
  }

  @Delete('/:userId')
  public async delete(@Param('userId') userId: string): Promise<UserDTO> {
    const deletedUser = await this.userService.delete(userId);
    return deletedUser;
  }
}
