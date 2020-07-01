import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answerPassword: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  yearOfBirth: { type: Number, required: true },
  maritalStatus: { type: Number, default:null },
  addictedStatus: { type: Number, default:null },
  myTarget: { type: Number, default:null },
  walletMember: { type: Boolean, default:null },
  friendMember: { type: Boolean, default:null},
  myWalletMembers: { type: [String], default:null },
  myFixedExpenses: { type: [{ name: String, expense: Number }],default:null },
  myFixedIncomes: { type: [{ name: String, income: Number }],default:null },
  passes: { type: Number,  default:5}
});

export interface User extends mongoose.Document {
  id: string;
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
  myFixedExpenses: [{ name: string, expense: number }];
  myFixedIncomes: [{ name: string, income: number }];
  passes: number;
}
