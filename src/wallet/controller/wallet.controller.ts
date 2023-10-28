import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IResponse } from 'src/common/interface/response.interface';
import { User } from 'src/user/entities/user.entity';
import {
  CreateWalletDto,
  IntializeFundWalletDto,
  VerifyTransactionDto,
} from '../dto/wallet.dto';
import { WalletService } from '../services/wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
@UseGuards(AuthGuard())
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create-wallet')
  async createWallet(
    @Body() body: CreateWalletDto,
    @Req() req: Request,
  ): Promise<IResponse> {
    const user = req.user as User;
    const wallet = await this.walletService.createWallet(
      body,
      user.id as unknown as string,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Wallet created successfully',
      data: wallet,
    };
  }

  @Get('find-wallet/:id')
  async findWallet(@Param('id', ParseUUIDPipe) id: string): Promise<IResponse> {
    const wallet = await this.walletService.findOneWalletById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Wallet fetched successfully',
      data: wallet,
    };
  }

  @Get('find-wallets')
  async findWallets(@Req() req: Request): Promise<IResponse> {
    const user = req.user as User;
    const wallets = await this.walletService.findWalletByUser(
      user.id as unknown as string,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Wallets fetched successfully',
      data: wallets,
    };
  }

  @Post('intialize-fund-wallet')
  async intializeFundWallet(
    @Body() body: IntializeFundWalletDto,
    @Req() req: Request,
  ): Promise<IResponse> {
    const user = req.user as User;
    const res = await this.walletService.intializeFundWallet(
      user.id as unknown as string,
      body.amount,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Wallet funded successfully',
      data: res,
    };
  }

  @Post('verify-transaction')
  async verifyTransaction(
    @Body() body: VerifyTransactionDto,
  ): Promise<IResponse> {
    const res = await this.walletService.verifyTransaction(body.reference);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaction verified successfully',
      data: res,
    };
  }
}
