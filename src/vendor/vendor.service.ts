import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly stripeService: StripeService,
  ) {}

  async getAllVendors() {
    return this.vendorRepository.find({
      select: [
        'id',
        'email',
        'name',
        'stripe_account_id',
        'escrow_balance',
        'available_balance',
      ],
    });
  }

  async createVendor(data: CreateVendorDto) {
    const vendor = this.vendorRepository.create({
      ...data,
      escrow_balance: 0,
      available_balance: 0,
    });

    // The VendorSubscriber will automatically create the Stripe account
    const savedVendor = await this.vendorRepository.save(vendor);

    // Get the onboarding URL for the newly created vendor
    if (savedVendor.stripe_account_id) {
      const accountLink = await this.stripeService.createAccountLink(
        savedVendor.stripe_account_id,
      );
      return {
        ...savedVendor,
        onboardingUrl: accountLink.url,
      };
    }

    return savedVendor;
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
