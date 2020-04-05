import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './components/Users/user.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:admin@walllet-oykbx.mongodb.net/test?retryWrites=true&w=majority'
  ),UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
