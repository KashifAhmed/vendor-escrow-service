// src/vendor/dto/update-vendor.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  name?: string;

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
