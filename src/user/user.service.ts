import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('User')
    private readonly userClient: ClientProxy,
  ) {}

  async test() {
    // const { data } = await this.httpService
    //   .get(this.configService.getPublicatonsRoute())
    //   .toPromise();

    const ok = await this.userClient.send('users-get', {}).toPromise();
    return ok;
  }
}
