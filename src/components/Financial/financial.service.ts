import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreditCard, Transaction } from '../Financial/financial.model';
import { UserService } from '../Users/user.service';
import { stripeData } from './stripeData';
import { User } from '../Users/user.model';
import { UserDto } from '../Users/dto/user.dto';

@Injectable()
export class FinancialService {
  constructor(@InjectModel('CreditCard') private readonly _creditCardModel: Model<CreditCard>,
              @InjectModel('Transaction') private readonly _transactionModel: Model<Transaction>, private _userService: UserService) {
  }

  async insertCreditCard(walletMemberId: string, companyName: string, creditCardNumber: string, valid: Date, cvc: string) {

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

    const newCreditCard : any = await this._creditCardModel.findOne({ 'walletMemberId': walletMemberId }).exec();

    return newCreditCard && newCreditCard._doc;
  }

  async insertTransaction(walletMember: User, business: string, price: number, date: Date) {

    // Maybe to remove to the controller
    const creditCard = await this.findCreditCardByWalletMemberId(walletMember._id.toString());

    if (!creditCard) {
      return null;
    }

    const walletMemberId = walletMember._id.toString();

    // Check if stripe card exist
    if (!walletMember.stripeCardId) {
      const userDto = new UserDto();
      userDto.id = walletMemberId;
      userDto.stripeCardId = await stripeData.creatPrepaidCreditCard(walletMember);
      walletMember = await this._userService.updateUser(userDto);
    }


    // Create token for transaction
    const creditCardToken = await stripeData.createCreditCardToken(creditCard);

    // Make transaction
    await stripeData.loadPrepaidCard(creditCardToken, price, walletMember.stripeCardId);

    const newTransaction = new this._transactionModel({
      walletMemberId,
      business,
      price,
      date,
    });

    const result = await newTransaction.save();

    return creditCardToken;
  }
}
