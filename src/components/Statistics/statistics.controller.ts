import { Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { StatisticsService } from './statistics.service';


@Controller('bot')
export class StatisticsController {
  constructor(private _statisticsService: StatisticsService, private readonly _requestService: RequestService) {
  }

  @Get(':myEmail')
  async getMoneyISaved(@Param('myEmail') myEmail: string): Promise<number> {
    return this._requestService.moneySavedSinceEver(myEmail);
  }

  @Get(':myEmail&:myFriendEmail')
  async getMoneySavedForMyBuddy(@Param('myEmail') myEmail: string, @Param('myFriendEmail') myFriendEmail: string): Promise<number> {
    return this._requestService.moneySavedForMyBuddy(myEmail, myFriendEmail);
  }

  @Get('monthMoney&:email')
  async getMoneyISpentThisMonth(@Param('email') email: string): Promise<number> {
    return this._requestService.howMuchISpentThisMonth(email);
  }

  @Get('MonthlyBalance&:email')
  async getMonthlyBalance(@Param('email') email: string): Promise<number> {
    return this._statisticsService.GetMonthlyBalance(email);
  }


}
