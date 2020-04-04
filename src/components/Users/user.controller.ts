import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post()
  addUser(@Body('FirstName') FirstName: string,
         @Body('LastName') LastName: string,
         @Body('Email') Email: string,
         @Body('PhoneNumber') PhoneNumber:number,
         @Body('DateOfBirth') DateOfBirth:Date,
         @Body('MaritalStatus') MaritalStatus:string,
         @Body('AddictedStatus') AddictedStatus:string,
         @Body('MyTarget') MyTarget:string,
         @Body('WalletMember') WalletMember:boolean,
         @Body('FriendMember') FriendMember:boolean,
         @Body('MyFixedExpenses') MyFixedExpenses:number,
         @Body('MyFixedIncomes') MyFixedIncomes:number,
  ) {

  };


}
