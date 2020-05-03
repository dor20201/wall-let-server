import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  category: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String, required: true },
  necessity: { type: Number, required: true },
  additionalDescription: { type: String, required: true },
  pic: { type: String, required: true },
  friendsConfirmation: { type: [{ email: String, confirm: Boolean }], required: true },
  botConfirmation: { type: Boolean, required: true },
  confirmationStatus: { type: Boolean, required: true }

});

export interface Request extends mongoose.Document {
  id: string
  email: string
  category: string
  cost: number;
  description: string
  necessity: number;
  additionalDescription: string;
  pic: string;
  friendsConfirmation: [{string,boolean}];
  botConfirmation: boolean;
  confirmationStatus: boolean;


}
