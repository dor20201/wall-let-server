export class UserDto {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: number;
  dateOfBirth: string;
  maritalStatus: string;
  addictedStatus: number;
  myTarget:number;
  walletMember: boolean;
  friendMember: boolean;
  myWalletMembers: string[];
  myFixedExpenses: [{string,number}];
  myFixedIncomes: [{string,number}];
  passes: number;
}
