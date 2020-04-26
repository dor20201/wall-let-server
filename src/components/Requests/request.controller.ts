import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private _requestModel: RequestService) {
  }



  @Patch()
  async createRequest(requestDto:RequestDto): Promise<string> {
    return this._requestModel.createRequest(requestDto);
  }
}
