import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {RequestSchema} from './request.model';
import { NotificationModule } from '../Notification/notification.module';
import { UserService } from '../Users/user.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Request',schema: RequestSchema}]), NotificationModule, UserService],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {

}
