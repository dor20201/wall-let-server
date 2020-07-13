import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import validate from 'validate.js';
import { UserService } from '../Users/user.service';
import { NotificationService } from '../Notification/notification.service';
import { User } from '../Users/user.model';
//import Stripe from "stripe";

@Controller('financial')
export class FinancialController {
  constructor(private financialService: FinancialService, private _userService: UserService) {
  }


  @Post("transaction")
  async MakeATransaction(@Body('userId') userId: string) {
    userId = '5efb52a6d0ed16402c0133e3';
    const user: User = await this._userService.getUserById(userId);
    const price = 10.35;


    this.financialService.insertTransaction(user,
      'aaaa',
      price,
      new Date(),
      ).then();
    return "success"

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

    const constraints = this.creditCardValidation();


    // Check if the details are valid
    // if(validate({creditCardNumber: cardNumber}, constraints) &&
    //   (/^\d{3,4}$/).test(cvc)) {
      this.financialService.insertCreditCard(userId,
        companyName,
        cardNumber,
        validDate,
        cvc).then();
      return "success"
    // } else {
    //   return "Invalid credit card's details"
    // }

  }

  private creditCardValidation() {
    const constraints = {
      creditCardNumber: {
        presence: true,
        format: {
          pattern: /^(34|37|4|5[1-5]).*$/,
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            return validate.format('^%{num} is not a valid credit card number', {
              num: value,
            });
          },
        },
        length: function(value, attributes, attributeName, options, constraints) {
          if (value) {
            // Amex
            if ((/^(34|37).*$/).test(value)) return { is: 15 };
            // Visa, Mastercard
            if ((/^(4|5[1-5]).*$/).test(value)) return { is: 16 };
          }
          // Unknown card, don't validate length
          return false;
        },
      },
    };
    return constraints;
  }
}
