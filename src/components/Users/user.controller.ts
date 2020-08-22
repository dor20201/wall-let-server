import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, WalletMemberDto } from './dto/user.dto';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {
  }

  //checked
  @Get(':id')
  async getUser(@Param('id') userId: string):Promise<User> {
    return await this._userService.getUserById(userId);
  }

  @Post('byEmail')
 async getUserByEmail(@Param('email') email: string):Promise<User> {
    return await this._userService.getUserByEmail(email);
  }

  //checked
  @Post('logIn')
  async logIn(@Body('email') userEmail: string,
         @Body('password') userPassword: string):Promise<User> {
    return await this._userService.getUserByPassword(userEmail, userPassword);
  }

  //checked
  @Post('signIn')
  async addUser(@Body('userDto')userDto: UserDto): Promise<User> {
    const user = await this._userService.insertUser(userDto);
    return user;
  };

  //checked
  @Post('verificationPasswordAnswer')
  async verificationPasswordAnswer(@Body('email') email: string,
                                     @Body('answer') answer: string): Promise<boolean> {
    const isItTrue = await this._userService.isPasswordAnswerCorrect(email, answer);
    return isItTrue;
  }

  @Patch()
  async updateUser(@Body('walletMemberDto')walletMemberDto: WalletMemberDto): Promise<User> {
    return await this._userService.updateUser(walletMemberDto);
  }

  @Post('updatePassword')
  async updatePassword(@Body('email') email:string,@Body('newPassword')newPassword: string): Promise<string> {
    return  await this._userService.updatePassword(email,newPassword);
  };

  // add friend member to my walletMember list
  @Post('addWalletFriend')
  async addWalletFriend(@Body('userId') userId:string,
                        @Body('friendEmail')friendEmail: string): Promise<User> {
    return  await this._userService.addWalletFriend(userId,friendEmail);
  };

  @Post()
  getUsersByEmails(@Body('emails') emails:[string]){
    return this._userService.getUsersByEmails(emails);
  }




}
