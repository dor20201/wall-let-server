import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, WalletMemberDto } from './dto/user.dto';
import { User } from './user.model';
import { encryption } from '../Common/encryption';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {
  }

  //checked
  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return await this._userService.getUserById(userId);
  }

  @Post('usersInfo')
  async getUsersInfo(@Body('email') email: string) {
    return await this._userService.getUsersInfoByWalletEmail(email);
  }

  @Post('byEmail')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this._userService.getUserByEmail(email);
  }

  //checked
  @Post('logIn')
  async logIn(@Body('email') userEmail: string,
              @Body('password') userPassword: string): Promise<User> {
    return await this._userService.getUserByPassword(userEmail, userPassword);
  }

  //checked
  @Post('signIn')
  async addUser(@Body('userDto')userDto: UserDto): Promise<User> {
    userDto.password = encryption.encrypt(userDto.password);
    userDto.answerPassword = encryption.encrypt(userDto.answerPassword);

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
  async updatePassword(@Body('email') email: string, @Body('newPassword')newPassword: string): Promise<string> {
    return await this._userService.updatePassword(email, encryption.encrypt(newPassword));
  };

  // add friend member to my walletMember list
  @Post('addWalletFriend')
  async addWalletFriend(@Body('userId') userId: string,
                        @Body('friendEmail')friendEmail: string) {
    return await this._userService.addWalletFriend(userId, friendEmail);
  };

  @Post('deleteWalletFriend')
  async deleteWalletFriend(@Body('userId') userId: string,
                        @Body('friendEmail')friendEmail: string) {
    return await this._userService.deleteWalletFriend(userId, friendEmail);
  };


  @Post()
  getUsersByEmails(@Body('emails') emails: [string]) {
    return this._userService.getUsersByEmails(emails);
  }

  @Post('passes')
  async getPasses(@Body('email') email:string){
   return await this._userService.getPasses(email);
  }
}
