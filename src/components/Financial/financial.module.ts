import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCardSchema, TransactionSchema } from './financial.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'CreditCard',schema: CreditCardSchema}, {name:'Transaction',schema: TransactionSchema}])],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {

}
