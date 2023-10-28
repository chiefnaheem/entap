import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { HttpServiceModule } from './common/http/http.module';
import { TransactionModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),

    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),

    AuthModule,
    UserModule,
    WalletModule,
    HttpServiceModule,
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
