import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      { apiVersion: '2025-03-31.basil' },
    );
  }

  async createVendorAccount(email: string, name: string) {
    // Create a Connect account for the vendor
    const account = await this.stripe.accounts.create({
      type: 'express', // or 'standard' based on your needs
      email,
      business_type: 'individual',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        name,
      },
    });

    return {
      accountId: account.id,
    };
  }

  async createAccountLink(accountId: string) {
    const baseUrl = this.configService.get('APP_URL') || 'http://localhost:3000';
    return await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/vendor/onboarding/refresh`,
      return_url: `${baseUrl}/vendor/onboarding/complete`,
      type: 'account_onboarding',
    });
  }

  async createCustomer(email: string, name: string) {
    return this.stripe.customers.create({
      email,
      name,
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    vendorAccountId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
      transfer_data: {
        destination: vendorAccountId, // The vendor's Stripe account ID
      },
    });
  }
}
