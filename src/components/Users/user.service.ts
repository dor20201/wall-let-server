import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
  }

  async insertUser(firstName: string,
                   lastName: string,
                   email: string,
                   password: string,
                   phoneNumber: number,
                   dateOfBirth: string,
                   maritalStatus: string,
                   addictedStatus: string,
                   myTarget: number,
                   walletMember: boolean,
                   friendMember: boolean,
                   myWalletMembers: string[],
                   myFixedExpenses: string[],
                   myFixedIncomes: string[],
                   passes: number,
  ) {
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      maritalStatus,
      addictedStatus,
      myTarget,
      walletMember,
      friendMember,
      myWalletMembers,
      myFixedExpenses,
      myFixedIncomes,
      passes,
    });
    const result = await newUser.save();
    return result._id;
  }

  async getUserById(userId: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (e) {
      throw new NotFoundException('could not find user');
    }
    if (!user) {
      throw new NotFoundException('could not find user');
    }
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }


  async getUserByPassword(userEmail: string, userPassword: string) {
    const user = await this.userModel.findOne({ Email: userEmail, Password: userPassword }).exec();
    if (!user) {
      throw new NotFoundException('The Email or Password are incorrect');
    }
    return user;
  }

  async updateUser(userId: string,
                   FirstName: string,
                   LastName: string,
                   Password: string,
                   PhoneNumber: number,
                   DateOfBirth: string,
                   MaritalStatus: string,
                   AddictedStatus: string,
                   MyTarget: number,
                   WalletMember: boolean,
                   FriendMember: boolean,
                   MyWalletMembers: string[],
                   MyFixedExpenses: string[],
                   MyFixedIncomes: string[]) {
    const updateUser = await this.getUserById(userId);
    if (FirstName) {
      updateUser.FirstName = FirstName;
    }
    if (LastName) {
      updateUser.LastName = LastName;
    }
    if (Password) {
      updateUser.Password = Password;
    }
    if (PhoneNumber) {
      updateUser.PhoneNumber = PhoneNumber;
    }
    if (DateOfBirth) {
      updateUser.DateOfBirth = DateOfBirth;
    }
    if (MaritalStatus) {
      updateUser.MaritalStatus = MaritalStatus;
    }
    if (AddictedStatus) {
      updateUser.AddictedStatus = AddictedStatus;
    }
    if (MyTarget) {
      updateUser.MyTarget = MyTarget;
    }
    if (MyFixedIncomes) {
      updateUser.MyFixedIncomes = MyFixedIncomes;
    }
    if (MyFixedExpenses) {
      updateUser.MyFixedExpenses = MyFixedExpenses;
    }
    if (MyWalletMembers) {
      updateUser.MyWalletMembers = MyWalletMembers;
    }

    return null;
  }
}



