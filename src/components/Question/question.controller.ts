import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';


@Controller('question')
export class QuestionController {
  constructor(private _questionService: QuestionService) {
  }

  @Get()
  async getQuestions(): Promise<QuestionDto[]> {
    const questions = await this._questionService.getQuestions();
    return questions;
  }

  @Post()
  async insertQuestion(@Body('questionDto') questionDto: QuestionDto): Promise<string> {
    await this._questionService.insertQuestion(questionDto);
    return "question was insert"
  }

}
