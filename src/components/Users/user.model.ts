import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answerPassword: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  yearOfBirth: { type: Number, required: true },
  maritalStatus: { type: Number, default: null },
  addictedStatus: { type: Number, default: null },
  myTarget: { type: Number, default: null },
  walletMember: { type: Boolean, default: false },
  friendMember: { type: Boolean, default: true },
  myWalletMembers: { type: [String], default: null },
  myFixedExpenses: { type: [{ name: String, value: Number }], default: null },
  myFixedIncomes: { type: [{ name: String, value: Number }], default: null },
  passes: { type: Number, default: 5 },
  updatePassesMonth:{ type: Number, default: new Date(Date.now()).getMonth()+1 },
  creditCardId: { type: String, default: null },
  stripeCardId: { type: String, default: null }
});

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: string;
  yearOfBirth: number;
  maritalStatus: number;
  addictedStatus: number;
  myTarget: number;
  walletMember: boolean;
  friendMember: boolean;
  myWalletMembers: string[]; // array of emails
  myFixedExpenses: [{ name: string, value: number }];
  myFixedIncomes: [{ name: string, value: number }];
  passes: number;
  updatePassesMonth:number;
  creditCardId: string;
  stripeCardId: string;
}
