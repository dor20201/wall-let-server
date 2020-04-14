import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {RequestSchema} from './request.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Request',schema: RequestSchema}])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {

}
