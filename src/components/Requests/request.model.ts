import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  openDate:{type:Number,default:Date.now()},
  closedDate:{type:Number,default:null},
  category: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String,default:null},
  necessity: { type: Number, required: true },
  additionalDescription: { type: String,default:null},
  pic: { type: String, default:null},
  friendsConfirmation: { type: [{ email: String, confirm: Boolean }], required: true },
  confirmationStatus: { type: Boolean, required: true }, // open ,approved
  botScore:{type:Number,default:null},
  subCategory: { type: String, required: true } // open ,approved, inProcess,unApproved

});

export interface Request extends mongoose.Document {
  id: string
  email: string
  openDate:number
  closedDate:number
  category: string
  cost: number;
  description: string
  necessity: number;
  additionalDescription: string;
  pic: string;
  friendsConfirmation: [{string,boolean}];
  confirmationStatus: boolean;// open ,approved, inProcess, completed;
  botScore:number;
  subCategory:string
}
