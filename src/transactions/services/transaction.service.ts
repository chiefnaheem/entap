import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateRandomAlphanumeric } from 'src/common/functions/common';
import { UserService } from 'src/user/service/user.service';
import { Wallet } from 'src/wallet/entities/wallet.entity';
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

      const [senderWalletDetails, receiverWalletDetails] = await Promise.all([
        this.walletService.findOneWalletById(senderWallet),
        this.walletService.findOneWalletById(receiverWallet),
      ]);

      if (!senderWalletDetails || !receiverWalletDetails) {
        throw new BadRequestException('Invalid wallet details');
      }

      if (senderWalletDetails.isLocked) {
        throw new BadRequestException('Possible duplicate transaction');
      }

      if (senderWalletDetails.balance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      const updatedSenderWallet = await this.walletService.updateWallet(
        senderWallet,
        { isLocked: true },
      );

      const newTransaction =
        await this.transactionRepository.manager.transaction(
          async (transactionalEntityManager) => {
            const createdTransaction = this.transactionRepository.create({
              ...transaction,
              createdBy: user,
              senderBalance: updatedSenderWallet.balance - amount,
              receiverBalance: receiverWalletDetails.balance + amount,
              status: TransactionStatus.PENDING,
              currency: senderWalletDetails.currency,
            });

            await transactionalEntityManager
              .getRepository(Transaction)
              .save(createdTransaction);

            return createdTransaction;
          },
        );

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
      Object.assign(transactionDetails, transaction);
      const updatedTransaction = await this.transactionRepository.save(
        transactionDetails,
      );
      return updatedTransaction;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTransactionsToApprove(): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionRepository.find({
        where: { status: TransactionStatus.REQUIRES_ACTION },
      });
      return transactions;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async adminApproveTransaction(id: string): Promise<Transaction> {
    try {
      const transactionDetails = await this.transactionRepository.findOne({
        where: { id, status: TransactionStatus.REQUIRES_ACTION },
        relations: ['senderWallet', 'receiverWallet'],
      });
      if (!transactionDetails) {
        throw new BadRequestException('Invalid transaction');
      }

      const reference = generateRandomAlphanumeric(10);

      const receiverWallet = transactionDetails.receiverWallet as unknown as Wallet;

      await this.walletService.updateWallet(receiverWallet.id, {
        balance: receiverWallet.balance + transactionDetails.amount,
      });

      await this.updateTransaction(id, {
        status: TransactionStatus.SUCCESSFUL,
        reference,
      });

      return transactionDetails;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
