import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./controller/transaction.controller";
import { Transaction } from "./entities/transaction.entity";
import { TransactionService } from "./services/transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService],
  })
  export class TransactionModule {}