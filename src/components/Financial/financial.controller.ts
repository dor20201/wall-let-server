import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import validate from 'validate.js';
import { UserService } from '../Users/user.service';
import { NotificationService } from '../Notification/notification.service';
import { User } from '../Users/user.model';
import { RequestService } from '../Requests/request.service';
//import Stripe from "stripe";

@Controller('financial')
export class FinancialController {
  constructor(private financialService: FinancialService, private _userService: UserService, private _requestService: RequestService) {
  }

  @Post("creditCard")
  async addCreditCard(@Body('userId') userId: string,
                @Body('companyName') companyName: string,
                @Body('cardNumber') cardNumber: string,
                @Body('valid') valid: number,
                @Body('cvc') cvc: string) {
    const user = await this._userService.getUserById(userId);
    const validDate = new Date(valid);

    // Check if the details are valid
    if (user == null || !user.walletMember) {
      return "user doesnt exist";
    }

    this.financialService.insertCreditCard(userId,
      companyName,
      cardNumber,
      validDate,
      cvc).then();
    return "success"
  }
}
