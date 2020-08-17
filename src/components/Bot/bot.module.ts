import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { RequestModule } from '../Requests/request.module';
import { QuestionModule } from '../Question/question.module';


@Module({
  imports: [RequestModule,QuestionModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {

}
