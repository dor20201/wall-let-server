import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from '../Requests/request.model';
import { RequestModule } from '../Requests/request.module';
import { QuestionSchema } from './question.model';


@Module({
  imports: [MongooseModule.forFeature([{name:'Question',schema: QuestionSchema}])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports:[QuestionService]
})
export class QuestionModule {

}
