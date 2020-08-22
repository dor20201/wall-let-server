import { HttpModule, Module, Req } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {RequestSchema} from './request.model';
import { UserModule } from '../Users/user.module';
import { MailModule } from '../Mail/mail.module';
import { CategoriesModule } from '../Categories/categories.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'Request',schema: RequestSchema}]), UserModule,MailModule,HttpModule,CategoriesModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports:[RequestService]
})
export class RequestModule {

}
