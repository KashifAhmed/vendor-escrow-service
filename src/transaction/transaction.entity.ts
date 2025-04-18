// src/transaction/transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';

export type TransactionStatus = 'held' | 'released' | 'paid';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.transactions)
  vendor: Vendor;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['held', 'released', 'paid'],
    default: 'held',
  })
  status: TransactionStatus;

  @Column()
  release_trigger: string;
}
