import { Module } from '@nestjs/common';
import { RequestModule } from '../Requests/request.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { UserModule } from '../Users/user.module';


@Module({
  imports: [RequestModule,UserModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {

}
