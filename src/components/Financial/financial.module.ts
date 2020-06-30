import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCardSchema, TransactionSchema } from './financial.model';
import { UserModule } from '../Users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'CreditCard',schema: CreditCardSchema}, {name:'Transaction',schema: TransactionSchema}]), UserModule],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {

}
