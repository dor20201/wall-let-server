import { Body, Controller, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { StatisticsService } from './statistics.service';
import { UserService } from '../Users/user.service';


@Controller('statistics')
export class StatisticsController {
  constructor(private _statisticsService: StatisticsService, private readonly _requestService: RequestService,
              private readonly _userService: UserService) {
  }

  @Post('MoneyISaved')
  async getMoneyISaved(@Body('email') myEmail: string): Promise<number> {
    return this._requestService.moneySavedSinceEver(myEmail);
  }

  @Post('moneyISpentThisMonth')
  async getMoneyISpentThisMonth(@Body('email') email: string): Promise<number> {
    return this._requestService.howMuchISpentThisMonth(email);
  }


  @Post("approveVsAll")
  async approveVsAll(@Body('email') email:string):Promise<number>{
   return await this._statisticsService.getApproveVsAll(email);
  }

  @Post("approvedVsDenied")
  async approvedVsDenied(@Body('email') email:string){
    return await this._statisticsService.getApprovedVsDenied(email);
  }

  @Post('MonthlyBalance')
  async getMonthlyBalance(@Body('email') email: string):Promise<number> {
    return this._statisticsService.GetMonthlyBalance(email);
  }


  @Post('infoAboutFriend')
  async getInfoAboutFriend(@Body('myEmail') myEmail: string,@Body('walletMemberEmail') walletMemberEmail: string) {
    return await this._statisticsService.getInfoAboutFriend(myEmail,walletMemberEmail);
  }






  //for friend Member
  @Post('myWalletMembers')
  async getMyWalletMember(@Body('myEmail') email: string): Promise<string[]> {
    return await this._userService.whoFriendIam(email);
  }
  //walletMember


  @Post('expenseByCategory')
  async getExpenseByCategory(@Body('email') email:string){
    return await this._statisticsService.getExpenseByCategory(email);
  }

  @Post('MoneySavedForMyBuddy')
  async getMoneySavedForMyBuddy(@Body('email') myEmail: string, @Body('myFriendEmail') myFriendEmail: string): Promise<number> {
    return this._requestService.moneySavedForMyBuddy(myEmail, myFriendEmail);
  }





}
