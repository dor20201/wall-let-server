import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }


  @Get()
  getHello(): string {
    return "swisa";
  }


  @Post()
  addUser(@Body('FirstName') FirstName: string,
          @Body('LastName') LastName: string,
          @Body('Email') Email: string,
          @Body('PhoneNumber') PhoneNumber: number,
          @Body('DateOfBirth') DateOfBirth: string,
          @Body('MaritalStatus') MaritalStatus: string,
          @Body('AddictedStatus') AddictedStatus: string,
          @Body('MyTarget') MyTarget: string,
          @Body('WalletMember') WalletMember: boolean,
          @Body('FriendMember') FriendMember: boolean,
          @Body('MyFixedExpenses') MyWalletMembers: [],
          @Body('MyFixedExpenses') MyFixedExpenses: [],
          @Body('MyFixedIncomes') MyFixedIncomes: [],
  ) {
    console.log("I made it to the Controller");

    this.userService.insertUser(FirstName, LastName, Email, PhoneNumber, DateOfBirth, MaritalStatus, AddictedStatus, WalletMember, FriendMember, MyWalletMembers, MyFixedExpenses, MyFixedIncomes, 5);
  };


}
