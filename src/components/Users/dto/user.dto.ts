export class UserDto {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: string;
  yearOfBirth: number;
  maritalStatus: number;
  addictedStatus: number;
  myTarget:number;
  walletMember: boolean;
  friendMember: boolean;
  myWalletMembers: string[];
  myFixedExpenses: [{ name: string, expense: number }];
  myFixedIncomes: [{ name: string, income: number }];
  passes: number;
}
