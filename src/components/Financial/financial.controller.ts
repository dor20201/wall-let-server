import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';

@Controller('financial')
export class FinancialController {
  constructor(private financialService: FinancialService) {
  }


}
