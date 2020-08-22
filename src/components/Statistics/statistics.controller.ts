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
  @Post('myWalletMembers')
  async getMyWalletMember(@Body('myEmail') email: string): Promise<string[]> {
    return await this._userService.whoFriendIam(email);
  }

  //  return allRequestApproved / allRequest;
  @Post("approveVsAll")
  async approveVsAll(@Body('email') email:string):Promise<number>{
   return await this._statisticsService.getApproveVsAll(email);
  }


  //walletMember

  @Post("approvedVsDenied")
  async approvedVsDenied(@Body('email') email:string){
    return await this._statisticsService.getApprovedVsDenied(email);
  }

  @Post('expenseByCategory')
  async getExpenseByCategory(@Body('email') email:string){
    return await this._statisticsService.getExpenseByCategory(email);
  }

  @Post('MonthlyBalance')
  async getMonthlyBalance(@Body('email') email: string): Promise<number> {
    return this._statisticsService.GetMonthlyBalance(email);
  }

  @Post('MoneyISaved')
  async getMoneyISaved(@Body('myEmail') myEmail: string): Promise<number> {
    return this._requestService.moneySavedSinceEver(myEmail);
  }

  @Post('MoneySavedForMyBuddy')
  async getMoneySavedForMyBuddy(@Body('email') myEmail: string, @Body('myFriendEmail') myFriendEmail: string): Promise<number> {
    return this._requestService.moneySavedForMyBuddy(myEmail, myFriendEmail);
  }

  @Post('moneyISpentThisMonth')
  async getMoneyISpentThisMonth(@Body('email') email: string): Promise<number> {
    return this._requestService.howMuchISpentThisMonth(email);
  }




}
