import { Module, Req } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {RequestSchema} from './request.model';
import { NotificationModule } from '../Notification/notification.module';
import { UserModule } from '../Users/user.module';
import { MailModule } from '../Mail/mail.module';
import { FinancialService } from '../Financial/financial.service';
import { FinancialModule } from '../Financial/financial.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'Request',schema: RequestSchema}]), NotificationModule, UserModule,MailModule,FinancialModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports:[RequestService]
})
export class RequestModule {

}
