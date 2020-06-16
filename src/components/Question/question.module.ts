import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './question.model';
import { RequestModule } from '../Requests/request.module';


@Module({
  imports: [MongooseModule.forFeature([{name:'Question',schema: QuestionSchema}]),RequestModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports:[QuestionService]
})
export class QuestionModule {

}
