import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, WalletMemberDto } from './dto/user.dto';
import { User } from './user.model';
import { stripeData } from '../Financial/stripeData';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {
  }

  //checked
  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this._userService.getUserById(userId);
  }

  //checked
  @Post('logIn')
  logIn(@Body('email') userEmail: string,
         @Body('password') userPassword: string) {
    return this._userService.getUserByPassword(userEmail, userPassword);
  }

  //checked
  @Post('signIn')
  async addUser(@Body('userDto')userDto: UserDto): Promise<User> {
    if(userDto.walletMember) {
      // Move after this will be a real stripe account.
      // userDto.stripeCardId = await stripeData.creatPrepaidCreditCard(userDto);
      userDto.stripeCardId = 'tok_mastercard_prepaid';
    }

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
  @Post('addWalletMember')
  async addWalletMember(@Body('userId') userId:string,@Body('friendEmail')friendEmail: string): Promise<User> {
    return  await this._userService.addWalletMember(userId,friendEmail);
  };

  @Post()
  getUsersByEmails(@Body('emails') emails:[string]){
    return this._userService.getUsersByEmails(emails);
  }
}
