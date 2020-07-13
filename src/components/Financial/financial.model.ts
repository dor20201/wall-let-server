import * as mongoose from 'mongoose';

export const CreditCardSchema = new mongoose.Schema({
  walletMemberId: { type: 'ObjectId', required: true, ref: 'User' },
  companyName: { type: String, required: true },
  creditCardNumber:{ type: String, required:true},
  valid:{ type: Date, required: true},
  cvc: {type: String, required: true}
});

export interface CreditCard extends mongoose.Document {
  walletMemberId: string;
  companyName: string;
  creditCardNumber: string;
  valid: Date;
  cvc: string;
}

export const TransactionSchema = new mongoose.Schema({
  walletMemberId: { type: 'ObjectId', required: true, ref: 'User' },
  requestId: { type: String, required: true },
  date:{ type: Date, required: true}
});

export interface Transaction extends mongoose.Document {
  walletMemberId: string;
  requestId: string;
  price: number;
  date: Date;
}
