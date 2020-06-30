import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreditCard, Transaction } from '../Financial/financial.model';
import { UserService } from '../Users/user.service';

@Injectable()
export class FinancialService {
  constructor(@InjectModel('CreditCard') private readonly _creditCardModel: Model<CreditCard>,
              @InjectModel('Transaction') private readonly _transactionModel: Model<Transaction>, private _userService: UserService) {
  }

  async insertCreditCard(walletMemberId: string, companyName: string, creditCardNumber: number, valid: Date, cvc: string) {

    const user = await this._userService.getUserById(walletMemberId);


    // Check if the details are valid
    if (user == null || !user.walletMember) {
      return "user doesnt exist";
    }

    let newCreditCard = await this.findCreditCardByWalletMemberId(walletMemberId);

    if (!newCreditCard) {
      newCreditCard = new this._creditCardModel({});
    }

    newCreditCard.companyName = companyName;
    newCreditCard.creditCardNumber = creditCardNumber;
    newCreditCard.cvc = cvc;
    newCreditCard.walletMemberId = walletMemberId;
    newCreditCard.valid = valid;

    const result = await newCreditCard.save();
    return result._id;
  }

  async findCreditCardByWalletMemberId(walletMemberId: string) {

    const user = await this._userService.getUserById(walletMemberId);


    // Check if the details are valid
    if (user == null || !user.walletMember) {
      return null;
    }

    const newCreditCard = await this._creditCardModel.findOne({ 'walletMemberId': walletMemberId }).exec();


    return newCreditCard;
  }

  async insertTransaction(walletMemberId: string, business: string, price: number, date: Date) {

    // Maybe to remove to the controller
    const creditCard = await this.findCreditCardByWalletMemberId(walletMemberId);

    // Check if the details are valid
    if (creditCard == null) {
      return "credit card doesnt exist";
    }
    // Check if there is enough money for the transaction

    // Create token for transaction

    // Make transaction

    const newTransaction = new this._transactionModel({
      walletMemberId,
      business,
      price,
      date
    });

    const result = await newTransaction.save();

    return result._id;
  }
}
