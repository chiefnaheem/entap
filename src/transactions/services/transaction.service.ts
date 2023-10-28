import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/service/user.service';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../enum/transaction.enum';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  async createTransaction(
    transaction: Partial<Transaction>,
    user: string,
  ): Promise<Transaction> {
    try {
      const { senderWallet, receiverWallet, amount } = transaction;
      const senderWalletDetails = await this.walletService.findOneWalletById(
        senderWallet,
      );
      if (senderWalletDetails.isLocked) {
        throw new BadRequestException('Possible duplicate transaction');
      }

      const receiverWalletDetails = await this.walletService.findOneWalletById(
        receiverWallet,
      );

      if (!senderWalletDetails || !receiverWalletDetails) {
        throw new BadRequestException('Invalid wallet details');
      }

      if (senderWalletDetails.balance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      const newTransaction = this.transactionRepository.create({
        ...transaction,
        createdBy: user,
        senderBalance: senderWalletDetails.balance - amount,
        receiverBalance: receiverWalletDetails.balance + amount,
        status: TransactionStatus.PENDING,
        currency: senderWalletDetails.currency,
      });

      await this.transactionRepository.save(newTransaction);

      await this.walletService.updateWallet(senderWallet, {
        isLocked: true,
      });

      //   await this.walletService.updateWallet(receiverWallet, {
      //     balance: receiverWalletDetails.balance + amount,
      //   });

      return newTransaction;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateTransaction(
    id: string,
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    try {
      const transactionDetails = await this.transactionRepository.findOne(id);
      if (!transactionDetails) {
        throw new BadRequestException('Invalid transaction');
      }
      const updatedTransaction = await this.transactionRepository.save({
        ...transactionDetails,
        ...transaction,
      });
      return updatedTransaction;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
