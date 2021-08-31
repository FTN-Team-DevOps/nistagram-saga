import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
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
          urls: [process.env.AMQP_URL],
          queue: 'publication_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
