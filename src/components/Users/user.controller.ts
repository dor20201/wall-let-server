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

  @Patch()
  async updateUser(@Body('walletMemberDto')walletMemberDto: WalletMemberDto): Promise<User> {
    return await this._userService.updateUser(walletMemberDto);
  }

  @Post('updatePassword')
  async updatePassword(@Body('userId') userId:string,@Body('newPassword')newPassword: string): Promise<string> {
    return  await this._userService.updatePassword(userId,newPassword);
  };

  @Post('addWalletMember')
  async addWalletMember(@Body('userId') userId:string,@Body('friendEmail')friendEmail: string): Promise<User> {
    return  await this._userService.addWalletMember(userId,friendEmail);
  };

  @Post()
  getUsersByEmails(@Body('emails') emails:[string]){
    return this._userService.getUsersByEmails(emails);
  }
}
