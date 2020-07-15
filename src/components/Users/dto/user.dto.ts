export class UserDto {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: string;
  yearOfBirth: number;
  friendMember: boolean;
  walletMember: boolean;
  creditCardId: string;
  stripeCardId: string;
}


export class WalletMemberDto{
  id:string;
  maritalStatus: number;
  addictedStatus: number;
  myTarget:number;
  walletMember: boolean;
  myWalletMembers: string[];
  myFixedExpenses: [{ name: string, expense: number }];
  myFixedIncomes: [{ name: string, income: number }];
  passes: number;
  creditCardId: string;
  stripeCardId: string;
}


