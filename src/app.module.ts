import { Module } from '@nestjs/common';
import { ActicityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PublicationModule } from './publication/publication.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    PublicationModule,
    UserModule,
    ActicityModule,
    AuthModule,
  ],
})
export class AppModule {}
