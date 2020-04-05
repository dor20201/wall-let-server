import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  PhoneNumber: { type: Number, required: true },
  DateOfBirth: { type: Date, required: true },
  MaritalStatus: { type: String, required: true },
  AddictedStatus: { type: String, required: true },
  WalletMember: { type: Boolean, required: true },
  FriendMember: { type: Boolean, required: true },
  MyWalletMembers: { type: [], required: true },
  MyFixedExpenses: { type: [], required: true },
  MyFixedIncomes: { type: [], required: true },
  Passes: { type: Number, required: true },

});

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: number;
  DateOfBirth: Date;
  MaritalStatus: string;
  AddictedStatus: string;
  WalletMember: boolean;
  FriendMember: boolean;
  MyWalletMembers: [];
  MyFixedExpenses: [];
  MyFixedIncomes: [];
  Passes: number;
}
