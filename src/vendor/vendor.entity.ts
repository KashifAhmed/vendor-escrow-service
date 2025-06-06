// src/vendor/vendor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  stripe_account_id: string;

  @Column({ type: 'decimal', default: 0 })
  escrow_balance: number;

  @Column({ type: 'decimal', default: 0 })
  available_balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.vendor)
  transactions: Transaction[];
}
