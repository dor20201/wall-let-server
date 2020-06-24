import { Module } from '@nestjs/common';
import { RequestModule } from '../Requests/request.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';


@Module({
  imports: [RequestModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {

}
