import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IResponse } from 'src/common/interface/response.interface';
import { User } from 'src/user/entities/user.entity';
import { CreateWalletDto } from '../dto/wallet.dto';
import { WalletService } from '../services/wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
@UseGuards(AuthGuard())
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create-wallet')
  async createWallet(@Body() body: CreateWalletDto, @Req() req: Request): Promise<IResponse> {
    try {
        const user = req.user as User;
      const wallet = await this.walletService.createWallet(body, user.id as unknown as string);
      return {
        statusCode: HttpStatus.OK,
        message: 'Wallet created successfully',
        data: wallet,
      };
    } catch (error) {
      throw error;
    }
  }
}
