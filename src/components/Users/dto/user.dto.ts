export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  answerPassword: string;
  phoneNumber: string;
  yearOfBirth: number;
  friendMember: boolean;
  walletMember: boolean;
}


export class WalletMemberDto {
  id: string;
  maritalStatus: number;
  addictedStatus: number;
  myTarget: number;
  walletMember: boolean;
  myWalletMembers: string[];
  myFixedExpenses: [{ name: string, value: number }];
  myFixedIncomes: [{ name: string, value: number }];
  passes: number;
  creditCardId: string;
  stripeCardId: string;
}


