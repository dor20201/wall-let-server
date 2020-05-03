import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  sum: { type: Number, required: true },
  category: { type: String, required: true },

});

export interface Notification extends mongoose.Document {
  id: string;
  Email: string;
  Sum: number;
  Category: string;


}
