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
  friendsConfirmation:[{email: string, confirm:boolean}];
  botConfirmation:boolean;
  confirmationStatus:string; //approved,unApproved,open
  score:number;
}
