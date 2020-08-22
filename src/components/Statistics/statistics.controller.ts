import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { StatisticsService } from './statistics.service';
import { UserService } from '../Users/user.service';
import { User } from '../Users/user.model';


@Controller('statistics')
export class StatisticsController {
  constructor(private _statisticsService: StatisticsService, private readonly _requestService: RequestService,
              private readonly _userService: UserService) {
  }

  @Get()
  getDor() {
    return 'Dor';
  }

  //for friend Member

  @Post('getMyWalletMember')
  async getMyWalletMember(@Body('myEmail') email: string): Promise<User[]> {
    return await this._userService.whoFriendIam(email);
  }

  //  return allRequestApproved / allRequest;
  @Post("approveVsAll")
  async approveVsAll(@Body('email') email:string):Promise<number>{
   return await this._statisticsService.getApproveVsAll(email);
  }



  //walletMember

  @Post('expenseByCategory')
  async getExpenseByCategory(@Body('email') email:string){
    return await this._statisticsService.getExpenseByCategory(email);
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
