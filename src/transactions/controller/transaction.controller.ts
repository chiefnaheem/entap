import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { IResponse } from "src/common/interface/response.interface";
import { User } from "src/user/entities/user.entity";
import { TransactionDto } from "../dto/transaction.dto";
import { TransactionEvent } from "../enum/transaction.enum";
import { TransactionService } from "../services/transaction.service";

@ApiTags('Transaction')
@Controller('transaction')
@UseGuards(AuthGuard())
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiBody({ type: TransactionDto, required: true })
  @Post('transfer')
  async createTransaction(@Body() body: TransactionDto, @Req() req: Request): Promise<IResponse> {
    const user = req.user as User;
    const transaction = await this.transactionService.createTransaction(body, user.id as unknown as string,);
    this.eventEmitter.emit(TransactionEvent.TRANSACTION_CREATED, transaction);
    return {
      statusCode: 200,
      message: 'Transaction created successfully',
      data: transaction,
    };
  }
}