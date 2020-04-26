import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {

  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>) {
  }

 async createRequest(requestDto:RequestDto): Promise<string>{
    const newRequest = new this._requestModel(requestDto);
    const result = await newRequest.save();
    return result._id;
    // create Notification for all the friends
  }


  getFriendRequest(Email:string): any{
    this._requestModel.find()
  }

}



