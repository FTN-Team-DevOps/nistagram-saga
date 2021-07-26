import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Auth')
    private readonly authClient: ClientProxy,
  ) {}

  async test() {
    const ok = await this.authClient.send('log-in', {}).toPromise();
    return ok;
  }
}
