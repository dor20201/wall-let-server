import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://admin:admin@walllet-oykbx.mongodb.net/test?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
