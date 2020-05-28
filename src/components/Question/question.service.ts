import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.model';
import { RequestService } from '../Requests/request.service';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private readonly _questionModel: Model<Question>,
              private readonly _requestService: RequestService) {
  }


  async insertQuestion(questionDto: QuestionDto) {
    try {
      const newQuestion = new this._questionModel(questionDto);
      const result = await newQuestion.save();
      return result._id;
    } catch (e) {
      throw new NotFoundException('The Question were not insert correctly ');
    }
  }

  async getQuestions(): Promise<QuestionDto[]> {
    const questions = await this._questionModel.find();
    return questions;
  }


}
