import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import validate from 'validate.js';
//import Stripe from "stripe";

@Controller('financial')
export class FinancialController {

  constructor(private financialService: FinancialService) {
  }

  @Post("creditCard")
  addCreditCard(@Body('userId') userId: string,
              @Body('companyName') companyName: string,
              @Body('cardNumber') cardNumber: number,
              @Body('valid') valid: Date,
              @Body('csv') csv: string) {
    const constraints = {
      creditCardNumber: {
        presence: true,
        format: {
          pattern: /^(34|37|4|5[1-5]).*$/,
          message: function(value, attribute, validatorOptions, attributes, globalOptions) {
            return validate.format("^%{num} is not a valid credit card number", {
              num: value
            });
          }
        },
        length: function(value, attributes, attributeName, options, constraints) {
          if (value) {
            // Amex
            if ((/^(34|37).*$/).test(value)) return {is: 15};
            // Visa, Mastercard
            if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
          }
          // Unknown card, don't validate length
          return false;
        }
      }
      }


    // TODO: Check if the details are valid
    if(validate({creditCardNumber: cardNumber}, constraints) &&
      (/^\d{3,4}$/).test(csv)) {
      this.financialService.insertCreditCard(userId,
        companyName,
        cardNumber,
        valid,
        csv).then();
      return "success"
    } else {
      return "Invalid credit card's details"
    }

  }

  @Post()
  addser(@Body('FirstName') FirstName: string,
         @Body('LastName') LastName: string,
         @Body('Email') Email: string,
         @Body('PhoneNumber') PhoneNumber:number,
         @Body('DateOfBirth') DateOfBirth:Date,
         @Body('MaritalStatus') MaritalStatus:string,
         @Body('AddictedStatus') AddictedStatus:string,
         @Body('MyTarget') MyTarget:string,
         @Body('WalletMember') WalletMember:boolean,
         @Body('FriendMember') FriendMember:boolean,
         @Body('MyFixedExpenses') MyFixedExpenses:number,
         @Body('MyFixedIncomes') MyFixedIncomes:number,
  ) {
    return;
  };



}
