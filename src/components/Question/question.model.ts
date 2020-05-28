import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  possibleAnswers: { type: [{ answer: String, points: Number }], required: true },
});

export interface Question extends mongoose.Document {
  question: string;
  possibleAnswers: [{ answer: string, points: number }]
}



