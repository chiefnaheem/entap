import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  senderWallet: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  receiverAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  narration: string;
}
