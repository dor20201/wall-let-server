import { Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from '../Question/question.service';
import { RequestService } from '../Requests/request.service';
import { QuestionDto } from '../Question/dto/question.dto';
import { RequestDto } from '../Requests/dto/request.dto';


@Controller('bot')
export class BotController {
  constructor(private readonly  _questionService: QuestionService,
              private readonly _requestService: RequestService) {
  }

  @Get()
  async getBotQuestions(): Promise<QuestionDto[]> {
    const Questions = await this._questionService.getQuestions();
    return Questions;
  }


  @Get('AllRequests')
  async getAllRequests123()  {
    const request= await this._requestService.getAllRequests();
    return request;
  };

  @Post('requestId&score')
  async insertScore(@Param('requestId') requestId: string, @Param('score') score: number): Promise<string> {
    const result = await this._requestService.insertScore(requestId, score);
    return result;
  }




}
