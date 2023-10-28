import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encrypt } from 'src/common/functions/common';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(wallet: Partial<Wallet>, user: string): Promise<Wallet> {
    try {
      this.logger.debug(`Creating wallet with data ${JSON.stringify(wallet)}`);

      const existingWallet = await this.walletRepository.findOne({
        where: {
          user,
          currency: wallet.currency,
        },
      });

      if (existingWallet) {
        throw new BadRequestException('Wallet already exists for this currency');
      }

      const encyptedAccountNumber = encrypt(wallet.accountNumber);
      const newWallet = this.walletRepository.create({
        ...wallet,
        balance: 0,
        accountNumber: encyptedAccountNumber,
        user,
      });

      return await this.walletRepository.save(newWallet);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
