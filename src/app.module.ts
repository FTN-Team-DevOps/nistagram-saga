import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [ConfigModule, PublicationModule],
})
export class AppModule {}
