import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Vendor } from './vendor.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class VendorSubscriber implements EntitySubscriberInterface<Vendor> {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    private readonly stripeService: StripeService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Vendor;
  }

  async beforeInsert(event: InsertEvent<Vendor>) {
    // Validate required fields
    if (!event.entity.email || !event.entity.name) {
      throw new Error('Email and name are required fields for vendor creation');
    }

    // Create Stripe customer if not already set
    if (!event.entity.stripe_account_id) {
      const customer = await this.stripeService.createCustomer(
        event.entity.email,
        event.entity.name,
      );
      event.entity.stripe_account_id = customer.id;
    }
  }
}
