import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCardSchema, TransactionSchema } from './financial.model';
import { UserModule } from '../Users/user.module';
import { UserService } from '../Users/user.service';
import { RequestModule } from '../Requests/request.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'CreditCard',schema: CreditCardSchema}, {name:'Transaction',schema: TransactionSchema}]), UserModule],
  controllers: [FinancialController],
  providers: [FinancialService],
  exports:[FinancialService]
})
export class FinancialModule {

}
