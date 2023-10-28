import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { WalletService } from '../services/wallet.service';

@Injectable()
export class WalletListener {
  private logger = new Logger('Wallet Listener');
  constructor(
     private readonly walletService: WalletService,
    private readonly userService: UserService,
  ) {}
}
