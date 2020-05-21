import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './components/Users/user.module';
import  {BusinessModule} from './components/Business/business.module';
import {RequestModule} from './components/Requests/request.module';
import { NotificationService } from './components/Notification/notification.service';
import { UserService } from './components/Users/user.service';
import { FinancialModule } from './components/Financial/financial.module';


@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:admin@walllet-oykbx.mongodb.net/test?retryWrites=true&w=majority'
  ),UserModule,BusinessModule,RequestModule, NotificationService, FinancialModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]

})
export class AppModule {


}
