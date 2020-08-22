import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';
import { NotificationService } from '../Notification/notification.service';
import { UserService } from '../Users/user.service';
import { MailService } from '../Mail/mail.service';
import { Mail } from '../Mail/mail.model';
import { WalletMemberDto } from '../Users/dto/user.dto';
import { User } from '../Users/user.model';

@Injectable()
export class RequestService {
  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>,
              private _notificationService: NotificationService, private _userService: UserService, private  _mailService: MailService) {
  }

  async createRequest(requestDto: RequestDto): Promise<Request> {
    try {
      const newRequest = new this._requestModel(requestDto);
      const result = await newRequest.save();
      const emails: string[] = requestDto.friendsConfirmation.map(c => c.email);
      await this._mailService.sendMails(emails, 'new request from ' + requestDto.email, 'your friend' + requestDto.email + 'send you a new request');
      return result;
    } catch (e) {
      throw new NotFoundException('could not create Request');

    }
  }

  async getAllRequests(): Promise<Request[]> {
    return this._requestModel.find({});
  }


  getAllRequestsByUserType(userType: number, Email: string): Promise<Request[]> {
    if (userType == 1) {
      return this._requestModel.find({ 'friendsConfirmation.email': Email }).exec();
    } else if (userType == 0) {
      return this._requestModel.find({ 'email': Email }).exec();
    }
  }


  getRequestsByStatus(userType: number, confirmationStatus: boolean, Email: string): Promise<Request[]> {
    //friendMember
    if (userType == 1) {
      return this._requestModel.find({
        'friendsConfirmation.email': Email,
        'confirmationStatus': confirmationStatus,
      }).exec();
//'walletMember'
    } else if (userType == 0) {
      return this._requestModel.find({ 'email': Email, 'confirmationStatus': confirmationStatus }).exec();

    }
  }


  async getRequestById(id: string): Promise<Request> {
    return this._requestModel.findOne({ '_id': id }).exec();
  }

  async reactToRequest(id: string, email: string, confirmationStatus: boolean) {
    let request;
    try {
      request = await this.getRequestById(id);

      request.friendsConfirmation.map(o => o.email == email).reduce(o => o.confirm = confirmationStatus);
      request.save();
      await this.isRequestApprove(id);
      return 'Answer received ';
    } catch (e) {
      throw new NotFoundException('could not find Request');
    }
  }

  private async isRequestApprove(id: string) {
    const request = await this.getRequestById(id);
    const totalFriends: number = request.friendsConfirmation.length;
    const approvedNum: number = request.friendsConfirmation.map(o => o[1] == true).length;
    if (totalFriends < 2 * approvedNum) {
      request.confirmationStatus = true;
      request.closedDate = Date.now();
      await request.save();

      const mail: Mail = {
        sendTo: request.email,
        subject: 'Your request has been approved',
        content: 'Your request to buy ' + request.description + 'has been approved :) ',

      };
      await this._mailService.sendMail(mail);
    }
  }

  async approveByPass(userId: string, requestId): Promise<string> {
    const request = await this.getRequestById(requestId);
    const user = await this._userService.getUserById(userId);
    if (user.passes > 0) {
      request.confirmationStatus = true;
      request.closedDate = Date.now();
      await request.save();
      user.passes = user.passes - 1;
      await user.save();
      const mail: Mail = {
        sendTo: request.email,
        subject: 'Your request has been approved',
        content: 'Your request to buy ' + request.description + ' has been approved :) ',
      };
      await this._mailService.sendMail(mail);

      return 'Request ' + requestId + 'has been approved';
    }
    return 'User dont have passes';
  }

  async approveByML(requestId): Promise<string> {
    const request = await this.getRequestById(requestId);
    request.confirmationStatus = true;
    request.closedDate = Date.now();
    await request.save();
    const mail: Mail = {
      sendTo: request.email,
      subject: 'Your request has been approved',
      content: 'Your request to buy ' + request.description + ' has been approved :) ',
    };
    await this._mailService.sendMail(mail);
    return 'Request ' + requestId + 'has been approved';
  }


  async insertScore(requestId: string, score: number): Promise<string> {
    const request = await this.getRequestById(requestId);
    request.botScore = score;
    await request.save();
    return 'botScore insert correctly';
  }

  async moneySavedSinceEver(email: string): Promise<number> {
    const requests: Request[] = await this._requestModel.find({ 'email': email, 'confirmationStatus': false });
    return requests.map(r => r.cost).reduce(function(a: number, b: number) {
      return a + b;
    });
  }

  async moneySavedForMyBuddy(myEmail: string, myFriendEmail: string): Promise<number> {
    const requests: Request[] = await this._requestModel.find({
      'email': myFriendEmail,
      'friendsConfirmation.email': { $contains: myEmail },
    });
    return requests.map(r => r.cost).reduce(function(a: number, b: number) {
      return a + b;
    });
  }

  async requestsIApproved(myEmail): Promise<Request[]> {
    return this._requestModel.find({ 'friendsConfirmation.email': { $contains: myEmail } });
  }

  async requestsByCategory(email: string, category: string): Promise<Request[]> {
    return this._requestModel.find({ 'email': email, category: category });

  }

  async requestsByStatus(email: string, status: boolean): Promise<Request[]> {
    return this._requestModel.find({ 'email': email, 'confirmationStatus': status });
  }

  async howMuchISpentThisMonth(email: string) {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    const requests: Request[] = await this._requestModel.find({
      'email': email,
      'confirmationStatus': true,
      'openedDate': { $lt: new Date(), $gt: new Date(year + ',' + month) },
    });

    try {
      return requests.map(r => r.cost).reduce(function(a: number, b: number) {
        return a + b;
      });
    } catch (e) {
      throw new NotFoundException(e);
    }

  }

  async completedRequest(requestId) {
    const request = await this.getRequestById(requestId);
    request.transaction = true;
    request.closedDate = Date.now();
    await request.save();
    const mail: Mail = {
      sendTo: request.email,
      subject: 'Your request has been completed',
      content: 'Your request to load your card in ' + request.cost + ' has been approved :) ',
    };
    await this._mailService.sendMail(mail);
  }

  async updateRequest(requestDto: RequestDto): Promise<Request> {
    try {
      const updateRequest = await this._requestModel.findById(requestDto.id).exec();
      if (requestDto.category) {
        updateRequest.category = requestDto.category;
      }
      if (requestDto.cost) {
        updateRequest.cost = requestDto.cost;
      }
      if (requestDto.description) {
        updateRequest.description = requestDto.description;
      }
      if (requestDto.necessity) {
        updateRequest.necessity = requestDto.necessity;
      }
      if (requestDto.additionalDescription) {
        updateRequest.additionalDescription = requestDto.additionalDescription;
      }
      if (requestDto.subCategory) {
        updateRequest.subCategory = requestDto.subCategory;
      }
      await updateRequest.save();
      return updateRequest;
    } catch (e) {
      throw new NotFoundException('The Request were not update');
    }
  }

  async deleteRequest(id: string) {
    try {
      await this._requestModel.deleteOne({ _id: id });
      return 'the Request has deleted';
    }catch (e){
      throw new NotFoundException('the Request has not deleted')
    }
  }

 async getRequestByOpenDate(userType: number, email: string, openDate: number) :Promise<Request[]>{

    if(userType == 0){
     return await this._requestModel.find({'openDate':openDate,'email':email}).exec()

    }else if(userType == 1){

      return await this._requestModel.find({ 'openDate':openDate,'friendsConfirmation.email': { $contains: email }}).exec()
    }
  }

  async getRequestByClosedDate(userType: number, email: string, closedDate: number) :Promise<Request[]>{

    if(userType == 0){
      return await this._requestModel.find({'closedDate':closedDate,'email':email}).exec()

    }else if(userType == 1){

      return await this._requestModel.find({ 'closedDate':closedDate,'friendsConfirmation.email': { $contains: email }}).exec()
    }
  }




}













