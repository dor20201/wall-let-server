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

  @Post('signIn')
  signIn(@Body('Email') userEmail: string,
         @Body('Password') userPassword: string) {
    return this._userService.getUserByPassword(userEmail, userPassword);
  }


  @Post()
  async addUser(userDto: UserDto): Promise<User> {
    const user = await this._userService.insertUser(userDto);
    return user;
  };

  @Post(':id')
  async verificationPasswordAnswer(@Param('id') userId: string,
                                   @Body('answer') answer: string): Promise<boolean> {
    const isItTrue = await this._userService.isPasswordAnswerCorrect(userId, answer);
    return isItTrue;
  }


  @Patch(':id')
  async updateUser(@Body() userDto: UserDto): Promise<string> {
    return await this._userService.updateUser(userDto);
  }
}
