import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get(':id')
  getProduct(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post('email')
  getUserByPassword(@Body('Email') userEmail: string,
                    @Body('Password') userPassword: string) {
    return this.userService.getUserByPassword(userEmail, userPassword);
  }


  @Post()
  addUser(@Body('FirstName') FirstName: string,
          @Body('LastName') LastName: string,
          @Body('Email') Email: string,
          @Body('Password') Password: string,
          @Body('AnswerPassword') AnswerPassword: string,
          @Body('PhoneNumber') PhoneNumber: number,
          @Body('DateOfBirth') DateOfBirth: string,
          @Body('MaritalStatus') MaritalStatus: string,
          @Body('AddictedStatus') AddictedStatus: string,
          @Body('MyTarget') MyTarget: number,
          @Body('WalletMember') WalletMember: boolean,
          @Body('FriendMember') FriendMember: boolean,
          @Body('MyWalletMembers') MyWalletMembers: string[],
          @Body('MyFixedExpenses') MyFixedExpenses: [{ string: number }],
          @Body('MyFixedIncomes') MyFixedIncomes: [{ string: number }],
  ): Promise<any> {
    const user = this.userService.insertUser(FirstName, LastName, Email, Password, AnswerPassword ,PhoneNumber, DateOfBirth, MaritalStatus, AddictedStatus, MyTarget, WalletMember, FriendMember, MyWalletMembers, MyFixedExpenses, MyFixedIncomes, 5).then();

    return user;
  };

  @Post(':id')
  async verificationPasswordAnswer(@Param('id') userId: string,
                              @Body('answer') answer: string): Promise<boolean> {
    const isItTrue = this.userService.isPasswordAnswerCorrect(userId, answer).then();
    return isItTrue;

  }


  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body('FirstName') FirstName: string,
    @Body('LastName') LastName: string,
    @Body('Email') Email: string,
    @Body('Password') Password: string,
    @Body('AnswerPassword') AnswerPassword: string,
    @Body('PhoneNumber') PhoneNumber: number,
    @Body('DateOfBirth') DateOfBirth: string,
    @Body('MaritalStatus') MaritalStatus: string,
    @Body('AddictedStatus') AddictedStatus: string,
    @Body('MyTarget') MyTarget: number,
    @Body('WalletMember') WalletMember: boolean,
    @Body('FriendMember') FriendMember: boolean,
    @Body('MyWalletMembers') MyWalletMembers: string[],
    @Body('MyFixedExpenses') MyFixedExpenses: [{ string: number }],
    @Body('MyFixedIncomes') MyFixedIncomes: [{ string: number }],
  ): any {
    console.log(PhoneNumber + '   ' + userId);
    this.userService.updateUser(userId, FirstName, LastName, Password,AnswerPassword, PhoneNumber, DateOfBirth, MaritalStatus, AddictedStatus, MyTarget, WalletMember, FriendMember, MyWalletMembers, MyFixedExpenses, MyFixedIncomes).then();
    return null;
  }
}
