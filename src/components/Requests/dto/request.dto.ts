export class RequestDto {
  id: string;
  email: string;
  openedDate:number;
  closedDate:number;
  category:string;
  cost:number;
  description:string;
  necessity:number;
  additionalDescription:string;
  pic: string;
  friendsConfirmation:[{string,boolean}];
  botConfirmation:boolean;
  confirmationStatus:string; //accept denied open
  score:number;
}
