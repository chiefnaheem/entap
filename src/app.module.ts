import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),

    AuthModule,
    UserModule,
    WalletModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
