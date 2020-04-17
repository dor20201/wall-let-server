import * as mongoose from 'mongoose';

export const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: Number, required: true },
  financial:{type: [{String:Number}],required:true}

});

export interface Business extends mongoose.Document {
  name: string;
  category: string;
  financial: [{string:number}];
}
