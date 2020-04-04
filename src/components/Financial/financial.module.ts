import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';

@Module({
  imports: [],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class Financial {

}
