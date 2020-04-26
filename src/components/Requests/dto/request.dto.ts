export class RequestDto {
  id: string;
  Email: string;
  category:string;
  cost:number;
  description:string;
  necessity:number;
  additionalDescription:string;
  pic: string;
  friendsConfirmation:[string];
  botConfirmation:boolean;
  confirmationStatus:boolean;
}
