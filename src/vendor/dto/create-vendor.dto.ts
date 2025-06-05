// src/vendor/dto/create-vendor.dto.ts
import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  stripe_account_id?: string;

  @IsOptional()
  @IsNumber()
  escrow_balance?: number;

  @IsOptional()
  @IsNumber()
  available_balance?: number;
}
