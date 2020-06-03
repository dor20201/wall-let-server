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
              @Body('cvc') cvc: string) {
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
      (/^\d{3,4}$/).test(cvc)) {
      this.financialService.insertCreditCard(userId,
        companyName,
        cardNumber,
        valid,
        cvc).then();
      return "success"
    } else {
      return "Invalid credit card's details"
    }

  }

}
