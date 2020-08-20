import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  importance: { type: Number, default: null },
  category: { type: String, default: null },
  subCategory: { type: [{ name: String, importance: Number }], default: null },
});

export interface Category extends mongoose.Document {
  category: string;
  importance: number;
  subCategory: [{ name: string, importance: number }];
}
