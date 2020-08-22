import { Get, Injectable, Param, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { UserService } from '../Users/user.service';
import { User } from '../Users/user.model';

@Injectable()
export class StatisticsService {
  constructor(private _userService: UserService, private _requestService: RequestService) {
  }

  async GetMonthlyBalance(email: string): Promise<number> {
    const user: User = await this._userService.getUserByEmail(email);
    const spent: number = await this._requestService.howMuchISpentThisMonth(email);
    return user.myTarget - spent;
  }

  async getApproveVsAll(email: string) {
    return await this._requestService.getApproveVsAll(email);
  }

  async getExpenseByCategory(email: string) {
    const r = await this._requestService.getExpenseByCategory(email);
    return r;
  }

  async getApprovedVsDenied(email: string) {
    return await this._requestService.getApprovedVsDenied(email);
  }

}
