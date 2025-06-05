import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async createVendor(data: CreateVendorDto) {
    const vendor = this.vendorRepository.create({
      ...data,
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
