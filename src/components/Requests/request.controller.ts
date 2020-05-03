import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private _requestModel: RequestService) {
  }

@Get('Email')
async getRequestForFriend(@Param('Email') Email:string){
  return await this._requestModel.getFriendRequests(Email);
}

  @Patch()
  async createRequest(@Body('request') requestDto:RequestDto): Promise<string> {
    return this._requestModel.createRequest(requestDto);
  }
  get
}
