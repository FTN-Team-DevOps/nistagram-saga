import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Publication',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqps://vfercydr:j1hUWYqCgZ730bD1sWHuvsM1WtuYjK8_@chimpanzee.rmq.cloudamqp.com/vfercydr`,
          ],
          queue: 'publication_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UserModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
