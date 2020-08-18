import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreditCard, Transaction } from '../Financial/financial.model';
import { UserService } from '../Users/user.service';
import { stripeData } from './stripeData';
import { User } from '../Users/user.model';
import { UserDto, WalletMemberDto } from '../Users/dto/user.dto';
import { Request } from '../Requests/request.model';

@Injectable()
export class FinancialService {
  constructor(@InjectModel('CreditCard') private readonly _creditCardModel: Model<CreditCard>,
              @InjectModel('Transaction') private readonly _transactionModel: Model<Transaction>,
              private _userService: UserService) {
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

    return newCreditCard;
  }

  async findTransactionByRequestId(requestId: string) {

    const transaction: any = await this._transactionModel.findOne({'requestId': requestId});


    return transaction && transaction._doc;
  }

  async insertTransaction(walletMemberEmail: string, request: Request, date: Date) {

    let walletMember: User = await this._userService.getUserByEmail(walletMemberEmail);
    const walletMemberId = walletMember._id.toString();

    const creditCard = (await this.findCreditCardByWalletMemberId(walletMemberId))._doc;

    const requestId = request._id.toString();

    // Check if to do the transaction
    if ((await this.findTransactionByRequestId(requestId)) ||
      !request ||
      request.confirmationStatus !== "approved" || !walletMember ||
      walletMemberEmail !== request.email || !creditCard) {
      return null;
    }

    // Check if stripe card exist
    if (!walletMember.stripeCardId) {
      const walletMemberDto = new WalletMemberDto();
      walletMemberDto.id = walletMemberId;
      // Move after this will be a real stripe account.
      //userDto.stripeCardId = await stripeData.creatPrepaidCreditCard(walletMember);
      walletMemberDto.stripeCardId = 'tok_mastercard_prepaid';
      walletMember = await this._userService.updateUser(walletMemberDto);
    }


    // Create token for transaction
    const creditCardToken = await stripeData.createCreditCardToken(creditCard);

    // Make transaction
    await stripeData.loadPrepaidCard(creditCardToken, request.cost, walletMember.stripeCardId);

    const newTransaction = new this._transactionModel({
      walletMemberId,
      requestId: requestId,
      price: request.cost,
      date,
    });

    const result = await newTransaction.save();

    return result;
  }
}
