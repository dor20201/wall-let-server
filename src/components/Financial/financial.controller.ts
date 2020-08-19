import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { UserService } from '../Users/user.service';
import { RequestService } from '../Requests/request.service';
import { User } from '../Users/user.model';

@Controller('financial')
export class FinancialController {
  constructor(private financialService: FinancialService, private _userService: UserService, private _requestService: RequestService) {
  }
  @Get("creditCard/:id")
  async getCreditCard(@Param('id') userId: string) {
    const user = await this._userService.getUserById(userId);

    // Check if the details are valid
    if (user == null || !user.walletMember) {
      return "user doesnt exist";
    }

    const card = (await this.financialService.findCreditCardByWalletMemberId(userId));

    if (card) {
      const cardNumber = card.creditCardNumber;
      // Last 3 digits
      return cardNumber && cardNumber.substr(cardNumber.length -3, 3);
    }
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

    const credit = await this.financialService.insertCreditCard(userId,
      companyName,
      cardNumber,
      validDate,
      cvc);
    if(credit) {
      // Last 3 digits
      return cardNumber.substr(cardNumber.length - 3, 3);
    }
    return "success"
  }

  @Post("transaction")
  async MakeATransaction(@Body('userId') userId: string,
                         @Body('requestId') requestId: string) {
    const user: User = await this._userService.getUserById(userId);
    const request = await this._requestService.getRequestById(requestId);
    const transaction = await this.financialService.insertTransaction(user,
      request,
      new Date(),
    );

    if (transaction) {
      await this._requestService.completedRequest(requestId);
    }

    return transaction;
  }
}
