import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    firstName: string;
    

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    address: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    dateOfBirth: string;

    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    maxLeaveDays: number;

}

export class UpdateUserDto extends PartialType(UserDto) {}

export class AddEmployeeToCompanyDto {
    // @ApiProperty()
    // @IsUUID()
    // @IsNotEmpty()
    // employeeId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    companyId: string;
}