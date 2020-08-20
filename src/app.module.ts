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
import { FinancialModule } from './components/Financial/financial.module';
import { BotModule } from './components/Bot/bot.module';
import { CategoryModule } from './components/category/category.module';


@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:admin@walllet.oykbx.mongodb.net/walletDB?retryWrites=true&w=majority'
  ),UserModule,BusinessModule,RequestModule, NotificationService,MailModule,QuestionModule,StatisticsModule, FinancialModule, BotModule,CategoryModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {


}
