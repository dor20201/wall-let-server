import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
  }

   async insertUser(firstName: string,
             lastName: string,
             email: string,
             phoneNumber: number,
             dateOfBirth: Date,
             maritalStatus: string,
             addictedStatus: string,
             walletMember: boolean,
             friendMember: boolean,
             myWalletMembers: [],
             myFixedExpenses: [],
             myFixedIncomes: [],
             passes: number) {

const newUser = new this.userModel({
  firstName,
  lastName,
  email,
  phoneNumber,
  dateOfBirth,
  maritalStatus,
  addictedStatus,
  walletMember,
  friendMember,
  myWalletMembers,
  myFixedExpenses,
  myFixedIncomes,
  passes
});
const result = await newUser.save();
console.log(result);
return result._id;
  }
}



