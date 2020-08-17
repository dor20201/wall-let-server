import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { StatisticsService } from './statistics.service';


@Controller('statistics')
export class StatisticsController {
  constructor(private _statisticsService: StatisticsService, private readonly _requestService: RequestService) {
  }

  @Get()
  getDor(){
    return "Dor"
  }

  @Get(':myEmail')
  async getMoneyISaved(@Param('myEmail') myEmail: string): Promise<number> {
    return this._requestService.moneySavedSinceEver(myEmail);
  }

  @Get(':myEmail&:myFriendEmail')
  async getMoneySavedForMyBuddy(@Param('myEmail') myEmail: string, @Param('myFriendEmail') myFriendEmail: string): Promise<number> {
    return this._requestService.moneySavedForMyBuddy(myEmail, myFriendEmail);
  }

  @Post('monthMoney')
  async getMoneyISpentThisMonth(@Body('email') email: string): Promise<number> {
    return this._requestService.howMuchISpentThisMonth(email);
  }

  @Get('MonthlyBalance&:email')
  async getMonthlyBalance(@Param('email') email: string): Promise<number> {
    return this._statisticsService.GetMonthlyBalance(email);
  }


}
