import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { UserService } from '../Users/user.service';

@Controller('financial')
export class FinancialController {
  constructor(private financialService: FinancialService, private _userService: UserService) {
  }
  @Get("creditCard/:id")
  async getCreditCard(@Param('id') userId: string) {
    const user = await this._userService.getUserById(userId);

    // Check if the details are valid
    if (user == null || !user.walletMember) {
      return "user doesnt exist";
    }


    return this.financialService.findCreditCardByWalletMemberId(userId);
  }

  @Post("creditCard")
  async addCreditCard(@Body('userId') userId: string,
                @Body('companyName') companyName: string,
                @Body('cardNumber') cardNumber: string,
                @Body('valid') valid: string,
                @Body('cvc') cvc: string) {
    const user = await this._userService.getUserById(userId);
    const dateParts = valid.toString().split("/");
    cardNumber = cardNumber.replace(/\s+/g, '');

    const validDate = new Date(Number('20' + dateParts[1]), +dateParts[0], 1);

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
