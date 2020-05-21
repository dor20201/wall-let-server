import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreditCard, Transaction } from '../Financial/financial.model';

@Injectable()
export class FinancialService {
  constructor(@InjectModel('CreditCard') private readonly CreditCardModel: Model<CreditCard>,
              @InjectModel('Transaction') private readonly TransactionModel: Model<Transaction>) {
  }

  async insertCreditCard(walletMemberId: string, companyName: string, creditCardNumber: number, valid: Date, cvc: string) {
    const newCreditCard = new this.CreditCardModel({
      walletMemberId,
      companyName,
      creditCardNumber,
      valid,
      cvc
    });

    const result = await newCreditCard.save();
    return result._id;
  }

  async insertTransaction(walletMemberId: string, business: string, price: number, date: Date) {
    const newTransaction = new this.TransactionModel({
      walletMemberId,
      business,
      price,
      date
    });

    const result = await newTransaction.save();
    return result._id;
  }
}
