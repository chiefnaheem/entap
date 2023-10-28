import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'The account number of the wallet' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ description: 'The currency of the wallet' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiPropertyOptional({ description: 'The default status of the wallet' })
  @IsBoolean()
  @IsOptional()
  isDefault: boolean;
}

export class IntializeFundWalletDto{
  @ApiProperty({ description: 'The amount to fund the wallet' })
  @IsInt()
  @IsNotEmpty()
  amount: number;
}

export class VerifyTransactionDto{
  @ApiProperty({ description: 'The transaction reference' })
  @IsString()
  @IsNotEmpty()
  reference: string;
}