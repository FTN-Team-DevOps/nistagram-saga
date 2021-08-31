import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Activity',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: 'activity_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UserModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActicityModule {}
