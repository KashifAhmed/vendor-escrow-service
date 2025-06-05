import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { StripeService } from '../stripe/stripe.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async createVendor(data: CreateVendorDto) {
    const customer = await this.stripeService.createCustomer(
      data.email,
      data.name,
    );
    const vendor = this.vendorRepository.create({
      ...data,
      stripe_account_id: customer.id,
      escrow_balance: 0,
      available_balance: 0,
    });
    return this.vendorRepository.save(vendor);
  }

  async updateVendor(id: number, data: UpdateVendorDto) {
    await this.vendorRepository.update(id, data);
    return this.vendorRepository.findOneBy({ id });
  }

  async deleteVendor(id: number) {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) throw new Error('Vendor not found');
    await this.vendorRepository.delete(id);
    return { deleted: true };
  }
}
