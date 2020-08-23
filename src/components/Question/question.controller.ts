import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';


@Controller('question')
export class QuestionController {
  constructor(private _questionService: QuestionService) {
  }

  @Get()
  async getQuestions(): Promise<QuestionDto[]> {
    return await this._questionService.getQuestions();
  }

  @Post()
  async insertQuestion(@Body('questionDto') questionDto: QuestionDto): Promise<string> {
    await this._questionService.insertQuestion(questionDto);
    return "question was insert"
  }

}
