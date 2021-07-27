import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Auth',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqps://vfercydr:j1hUWYqCgZ730bD1sWHuvsM1WtuYjK8_@chimpanzee.rmq.cloudamqp.com/vfercydr`,
          ],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
