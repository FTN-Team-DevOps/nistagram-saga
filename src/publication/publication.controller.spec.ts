import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

describe('PublicationController', () => {
  let controller: PublicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<PublicationController>(PublicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
