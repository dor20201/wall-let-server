import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';
import {NotificationService} from '../Notification/notification.service';

@Injectable()
export class RequestService {

  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>,
              private notificationService: NotificationService) {
  }

 async createRequest(requestDto:RequestDto): Promise<string>{
    const newRequest = new this._requestModel(requestDto);
    const result = await newRequest.save();
    return result._id;
  }


  getFriendRequests(Email:string): any{
   return  this._requestModel.find({"myWalletMembers" : Email})
  }

}



