import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletController } from "./controller/wallet.controller";
import { Wallet } from "./entities/wallet.entity";
import { WalletService } from "./services/wallet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService],
  })
  export class WalletModule {}