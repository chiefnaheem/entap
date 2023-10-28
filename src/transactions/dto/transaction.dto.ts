import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  senderWallet: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  receiverWallet: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    narration: string;
}
