import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  level:{ type: Number, required: true },
  possibleAnswers: { type: [{ answer: String, points: Number }], required: true },
});

export interface Question extends mongoose.Document {
  question: string;
  level:number;
  possibleAnswers: [{ answer: string, points: number }]
}



