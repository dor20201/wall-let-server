export class RequestDto {
  id: string;
  email: string;
  openDate: number;
  closedDate: number;
  category: string;
  cost: number;
  description: string;
  necessity: number;
  additionalDescription: string;
  pic: string;
  friendsConfirmation: [{ email: string, confirm: number }];
  confirmationStatus: boolean;
  botScore: number;
  subCategory: string;
}
