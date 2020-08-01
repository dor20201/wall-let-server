import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './components/Users/user.module';
import  {BusinessModule} from './components/Business/business.module';
import {RequestModule} from './components/Requests/request.module';
import { NotificationService } from './components/Notification/notification.service';
import {MailModule} from './components/Mail/mail.module';
import { QuestionModule } from './components/Question/question.module';
import { StatisticsModule } from './components/Statistics/statistics.module';
import { BotModule } from './components/Bot/bot.module';


@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:admin@walllet-oykbx.mongodb.net/test?retryWrites=true&w=majority'
  ),UserModule,BusinessModule,RequestModule, NotificationService,MailModule,QuestionModule,StatisticsModule,BotModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {


}
