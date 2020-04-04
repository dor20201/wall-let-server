import { Module } from '@nestjs/common';
import { GamenificationService } from './gamenification.service';
import { GamenificationController } from './gamenification.controller';

@Module({
  imports: [],
  controllers: [GamenificationController],
  providers: [GamenificationService],
})
export class Gamenification {

}
