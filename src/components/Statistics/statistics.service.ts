import { Injectable } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { UserService } from '../Users/user.service';
import { User } from '../Users/user.model';

@Injectable()
export class StatisticsService {
  constructor(private _userService: UserService, private _requestService: RequestService) {
  }

  async GetMonthlyBalance(email: string) {
    const user: User = await this._userService.getUserByEmail(email);
    const spent: number = await this._requestService.howMuchISpentThisMonth(email);

    if (user) {
      return user.myTarget - spent;
    }else{
      return 0;
    }

  }

  async getApproveVsAll(email: string) {
    return await this._requestService.getApproveVsAll(email);
  }

  async getExpenseByCategory(email: string) {
    return await this._requestService.getExpenseByCategory(email);
  }

  async getApprovedVsDenied(email: string) {
    return await this._requestService.getApprovedVsDenied(email);
  }

  async getInfoAboutFriend(myEmail:string,walletMemberEmail:string){
  return await this._requestService.getInfoAboutFriend(myEmail, walletMemberEmail);
  }

}
