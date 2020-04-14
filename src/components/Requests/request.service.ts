import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {

  constructor(@InjectModel('Request') private readonly userModel: Model<Request>) {
  }


}



