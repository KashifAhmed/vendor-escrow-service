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

    // Create Stripe Connect account if not already set
    if (!event.entity.stripe_account_id) {
      try {
        const { accountId } = await this.stripeService.createVendorAccount(
          event.entity.email,
          event.entity.name,
        );
        event.entity.stripe_account_id = accountId;
      } catch (error) {
        // Check if it's a Connect setup error
        if (error.message.includes('signed up for Connect')) {
          throw new Error(
            'Stripe Connect is not set up. Please follow these steps:\n' +
            '1. Go to https://dashboard.stripe.com/settings/connect\n' +
            '2. Click "Get started with Connect"\n' +
            '3. Complete the Connect onboarding\n' +
            '4. Update your .env file with the Connect-enabled API keys'
          );
        }
        throw new Error(`Failed to create Stripe account: ${error.message}`);
      }
    }
  }
}
