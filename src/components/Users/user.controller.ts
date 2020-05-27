import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this._userService.getUserById(userId);
  }

  @Post()
  getUsersByEmails(@Body('emails') emails:[string]){
    return this._userService.getUsersByEmails(emails);
  }
  //checked
  @Post('signIn')
  signIn(@Body('email') userEmail: string,
         @Body('password') userPassword: string) {
    return this._userService.getUserByPassword(userEmail, userPassword);
  }

//checked
  // need to fix incomes and Expenses
  @Post()
  async addUser(@Body('userDto')userDto: UserDto): Promise<User> {
    const user = await this._userService.insertUser(userDto);
    return user;
  };

  //checked
  @Post(':id')
  async verificationPasswordAnswer(@Param('id') userId: string,
                                   @Body('answer') answer: string): Promise<boolean> {
    const isItTrue = await this._userService.isPasswordAnswerCorrect(userId, answer);
    return isItTrue;
  }

//checked
  @Patch()
  async updateUser(@Body() userDto: UserDto): Promise<User> {
    return await this._userService.updateUser(userDto);
  }
}
