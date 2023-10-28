import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { TransactionService } from "../services/transaction.service";

@ApiTags('Transaction')
@Controller('transaction')
@UseGuards(AuthGuard())
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}
}