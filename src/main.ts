import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://vfercydr:j1hUWYqCgZ730bD1sWHuvsM1WtuYjK8_@chimpanzee.rmq.cloudamqp.com/vfercydr',
      ],
      queue: 'my_queue',
      queueOptions: { durable: false },
    },
  });

  app.setGlobalPrefix('/api/v1');

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
