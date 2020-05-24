import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';
import { NotificationService } from '../Notification/notification.service';
import {UserService} from '../Users/user.service';

@Injectable()
export class RequestService {
  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>,
              private _notificationService: NotificationService,private _userService:UserService) {
  }

  async createRequest(requestDto: RequestDto): Promise<string> {
  try{
    const newRequest = new this._requestModel(requestDto);
    const result = await newRequest.save();
    // add Notification
    return result._id;}
    catch (e) {
      throw new NotFoundException('could not create Request');

    }
  }


  getRequests(userType: string, confirmationStatus: string, Email: string): Promise<Request[]> {

    if (userType == 'friendMember') {
      if (confirmationStatus == 'All') {
        return this._requestModel.find({ 'friendsConfirmation.email': Email }).exec();
      } else if (confirmationStatus == 'open') {
        return this._requestModel.find({
          'friendsConfirmation.email': Email,
          'confirmationStatus': confirmationStatus,
        }).exec();

      }
    } else if (userType == 'walletMember') {
      if (confirmationStatus == 'All') {
        return this._requestModel.find({ 'email': Email }).exec();
      } else {
        return this._requestModel.find({ 'email': Email, 'confirmationStatus': confirmationStatus }).exec();

      }
    }
  }


  async getRequestById(id: string): Promise<Request> {
    return this._requestModel.findOne({ '_id': id }).exec();
  }


  async reactToRequest(id: string, email: string, answer: string) {
    let request;
    try {
      request = await this.getRequestById(id);

      request.friendsConfirmation.map(o => o.email == email).reduce(o => o.confirm = answer);
      request.save();
      await this.isRequestApprove(id);
      return 'Answer received ';
    } catch (e) {
      throw new NotFoundException('could not find Request');
    }
  }

  private async isRequestApprove(id: string) {
    const request = await this.getRequestById(id);
    const totalFriends:number = request.friendsConfirmation.length;
    const approvedNum:number = request.friendsConfirmation.map(o => o[1] == true).length;
    if(totalFriends < 2* approvedNum){
      request.confirmationStatus = "approved";
      // add Notification
      await request.save();
    }
  }

   async approveByPass(userId:string,requestId): Promise<string>{
    const request = await this.getRequestById(requestId);
    const user = await this._userService.getUserById(userId);
    if(user.passes > 0){
      request.confirmationStatus = "approved";
      user.passes = user.passes - 1 ;
      await user.save();
      return 'approved';
    }
    return 'User dont have passes';
  }
}












