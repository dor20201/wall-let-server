import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answerPassword: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  dateOfBirth: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  addictedStatus: { type: Number, required: true },
  myTarget: { type: Number, required: true },
  walletMember: { type: Boolean, required: true },
  friendMember: { type: Boolean, required: true },
  myWalletMembers: { type: [String], required: true },
  myFixedExpenses: { type: [{ name: String, expense: Number }], required: true },
  myFixedIncomes: { type: [{ name: String, income: Number }], required: true },
  passes: { type: Number, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: number;
  dateOfBirth: string;
  maritalStatus: string;
  addictedStatus: number;
  myTarget: number;
  walletMember: boolean;
  friendMember: boolean;
  myWalletMembers: string[]; // array of emails
  myFixedExpenses: [{ name: string, expense: number }];
  myFixedIncomes: [{ name: string, income: number }];
  passes: number;
}
