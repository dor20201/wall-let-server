import * as mongoose from 'mongoose';

export const CategoriesSchema = new mongoose.Schema({
  importance: { type: Number, default: null },
  category: { type: String, default: null },
  subCategory: { type: [{ name: String, importance: Number }], default: null },
});

export interface Categories extends mongoose.Document {
  category: string;
  importance: number;
  subCategory: [{ name: string, importance: number }];
}
