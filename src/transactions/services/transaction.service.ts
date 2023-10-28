import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/service/user.service";
import { WalletService } from "src/wallet/services/wallet.service";
import { Repository } from "typeorm";
import { Transaction } from "../entities/transaction.entity";

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

    async createTransaction(transaction: Partial<Transaction>, user: string): Promise<Transaction> {
}