import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private userService: RequestService) {
  }


}
