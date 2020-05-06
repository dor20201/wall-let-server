import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';
import { NotificationService } from '../Notification/notification.service';

@Injectable()
export class RequestService {

  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>,
              private notificationService: NotificationService) {
  }

  async createRequest(requestDto: RequestDto): Promise<string> {
    const newRequest = new this._requestModel(requestDto);
    const result = await newRequest.save();
    return result._id;
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
      this.isRequestApprove(id);
      return 'Answer received ';
    } catch (e) {
      throw new NotFoundException('could not find Request');
    }
  }

  private isRequestApprove(id: string) {
    const request = this.getRequestById(id);
    // insert logic that check if there are more them 50% approvers
  }
}












