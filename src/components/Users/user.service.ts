import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Model } from 'mongoose';
import { UserModule } from './user.module';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {
  }

  async insertUser(userDto: UserDto) {
    const newUser = new this._userModel(userDto);
    const result = await newUser.save();
    return result._id;
  }

  async getUserById(userId: string): Promise<User> {
    let user;
    try {
      user = await this._userModel.findById(userId).exec();
    } catch (e) {
      throw new NotFoundException(e);
    }
    if (!user) {
      throw new NotFoundException('could not find user');
    }

    return user._doc;
  }

  async getUsers() {
    const users = await this._userModel.find().exec();
    return users;
  }

  async getUserByPassword(userEmail: string, userPassword: string) {
    const user = await this._userModel.findOne({ 'email': userEmail, 'password': userPassword }).exec();
    if (!user) {
      throw new NotFoundException('The Email or Password are incorrect');
    }
    return user;
  }

  async isPasswordAnswerCorrect(userId: string, answer: string) {
    let user;
    try {
      user = await this.getUserById(userId);
      if (user.answerPassword == answer) {
        return true;
      }
      return false;
    } catch (e) {
      throw new NotFoundException('could not find user');
    }
  }

  async updateUser(userDto: UserDto) {
    const updateUser = await this._userModel.findById(userDto.id).exec();

    if (userDto.firstName) {
      updateUser.firstName = userDto.firstName;
    }
    if (userDto.lastName) {
      updateUser.lastName = userDto.lastName;
    }
    if (userDto.password) {
      updateUser.password = userDto.password;
    }
    if (userDto.answerPassword) {
      updateUser.answerPassword = userDto.answerPassword;
    }
    if (userDto.phoneNumber) {
      updateUser.phoneNumber = userDto.phoneNumber;
    }
    if (userDto.dateOfBirth) {
      updateUser.dateOfBirth = userDto.dateOfBirth;
    }
    if (userDto.maritalStatus) {
      updateUser.maritalStatus = userDto.maritalStatus;
    }
    if (userDto.addictedStatus) {
      updateUser.addictedStatus = userDto.addictedStatus;
    }
    if (userDto.myTarget) {
      updateUser.myTarget = userDto.myTarget;
    }
    if (userDto.myFixedIncomes) {
      updateUser.myFixedIncomes = userDto.myFixedIncomes;
    }
    if (userDto.myFixedExpenses) {
      updateUser.myFixedExpenses = userDto.myFixedExpenses;
    }
    if (userDto.myWalletMembers) {
      updateUser.myWalletMembers = userDto.myWalletMembers;
    }
    await updateUser.save();
    return 'Done';
  }


}



