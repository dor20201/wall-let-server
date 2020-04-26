import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  sum: { type: Number, required: true },
  category: { type: String, required: true },

});

export interface Request extends mongoose.Document {
  id: string;
  Email: string;
  Sum: number;
  Category: string;


}