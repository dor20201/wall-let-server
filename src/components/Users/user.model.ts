import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
   dateOfBirth: { type: String, required: true },
   maritalStatus: { type: String, required: true },
  addictedStatus: { type: String, required: true },
  myTarget: { type: Number, required: true },
  walletMember: { type: Boolean, required: true },
  friendMember: { type: Boolean, required: true },
  myWalletMembers: { type: [String], required: true },
  myFixedExpenses: { type: [{String:Number}], required: true },
  myFixedIncomes: { type: [{String:Number}], required: true },
  passes: { type: Number, required: true }

});

export interface User extends mongoose.Document{
  id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PhoneNumber: number;
  DateOfBirth: string;
  MaritalStatus: string;
  AddictedStatus: string;
  MyTarget:number;
  WalletMember: boolean;
  FriendMember: boolean;
  MyWalletMembers: string[];
  MyFixedExpenses: string[];
  MyFixedIncomes: string[];
  Passes: number;
}
