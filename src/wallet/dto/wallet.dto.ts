import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
