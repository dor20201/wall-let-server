export class RequestDto {
  id: string;
  email: string;
  openedDate: number;
  closedDate: number;
  category: string;
  cost: number;
  description: string;
  necessity: number;
  additionalDescription: string;
  pic: string;
  friendsConfirmation: [{ email: string, confirm: boolean }];
  confirmationStatus: boolean;
  botScore: number;
  subCategory: string;
}
