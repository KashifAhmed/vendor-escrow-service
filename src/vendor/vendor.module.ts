import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { StripeService } from 'src/stripe/stripe.service';
import { Vendor } from './vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transaction/transaction.entity';
import { VendorSubscriber } from './vendor.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Transaction])],
  providers: [VendorService, StripeService, VendorSubscriber],
  controllers: [VendorController],
})
export class VendorModule {}
