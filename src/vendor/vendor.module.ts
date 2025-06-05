import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { StripeService } from 'src/stripe/stripe.service';
import { Vendor } from './vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Transaction])],
  providers: [VendorService, StripeService],
  controllers: [VendorController],
})
export class VendorModule {}
