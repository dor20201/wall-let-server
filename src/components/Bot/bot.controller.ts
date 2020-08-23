import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from '../Question/question.service';
import { RequestService } from '../Requests/request.service';
import { QuestionDto } from '../Question/dto/question.dto';


@Controller('bot')
export class BotController {
  constructor(private readonly  _questionService: QuestionService,
              private readonly _requestService: RequestService) {
  }

  @Get()
  async getBotQuestions(): Promise<QuestionDto[]> {
    return await this._questionService.getQuestions();
  }


  @Get('AllRequests')
  async getAllRequests123()  {
    return await this._requestService.getAllRequests();
  };

  @Post('insertBotScore')
  async insertScore(@Body('reqId') requestId: string, @Body('botScore') score: number): Promise<string> {
    return await this._requestService.insertScore(requestId, score);
  }



}
