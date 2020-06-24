import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {
  }

  async insertUser(userDto: UserDto) {
    try {
      const newUser = new this._userModel(userDto);
      const result = await newUser.save();
      return result._id;
    } catch (e) {
      throw new NotFoundException('The Users were not insert correctly ');
    }
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

  async getUserByPassword(userEmail: string, userPassword: string): Promise<User> {
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

  async updateUser(userDto: UserDto): Promise<User> {
    try {
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
      if (userDto.yearOfBirth) {
        updateUser.yearOfBirth = userDto.yearOfBirth;
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
      return updateUser;
    } catch (e) {
      throw new NotFoundException('The Users were not update');
    }
  }

  async getUsersByEmails(emails: string[]): Promise<any> {
    try {
      return await this._userModel.find({ 'email': { $in: emails } }).exec();
    } catch (e) {
      throw new NotFoundException('The Users were not found');
    }
  }


  async getUserByEmail(email: string): Promise<User> {
    const user = await this._userModel.findOne({ 'email': email });
    return user;
  }
}





