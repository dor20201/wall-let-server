import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.model';
import { Model } from 'mongoose';
import { RequestDto } from './dto/request.dto';
import { UserService } from '../Users/user.service';
import { MailService } from '../Mail/mail.service';
import { Mail } from '../Mail/mail.model';
import { CategoriesService } from '../Categories/categories.service';
import { User } from '../Users/user.model';


@Injectable()
export class RequestService {
  constructor(@InjectModel('Request') private readonly _requestModel: Model<Request>,
              @InjectModel('User') private readonly _userModel: Model<User>,
              private _userService: UserService, private  _mailService: MailService,
              private httpService: HttpService, private  _categoriesService: CategoriesService) {

  }


  createFriendConfirmation(friendEmails: string[]): [{ email: string, confirm: number }] {
    const friendsConfirmation: [{ email: string, confirm: number }] = [{ email: '', confirm: 0 }];

    for (let i = 0; i < friendEmails.length; i++) {
      if (i == 0) {
        friendsConfirmation.pop();
        friendsConfirmation.push({
          'email': friendEmails[0],
          'confirm': 0,
        });
      } else {
        friendsConfirmation.push({
          'email': friendEmails[i],
          'confirm': 0,
        });
      }
    }


    return friendsConfirmation;
  }

  async sendMl(request: Request, user) {
    const mlServer = 'http://b820cdb00bca.ngrok.io/req';
    const requests = await this.getAllRequestsByUserType(0, request.email);
    const categories = await this._categoriesService.getCategories();
    this.httpService.post(mlServer, {
      'the_request': request,
      'requests': requests,
      'user_target': user.target,
      'categories': categories,
    });
  }

  async createRequest(requestDto: RequestDto): Promise<Request> {
    try {
      await this._userService.updatePasses(requestDto.email);
      const user = await this._userService.getUserByEmail(requestDto.email);
      requestDto.friendsConfirmation = this.createFriendConfirmation(user.myWalletMembers);
      const newRequest = new this._requestModel(requestDto);
      const result = await newRequest.save();
      const emails: string[] = requestDto.friendsConfirmation.map(c => c.email);
      await this._mailService.sendMails(emails, 'new request from ' + requestDto.email, ' your friend' + requestDto.email + 'send you a new request');


      await this.sendMl(newRequest, user);

      return result;
    } catch (e) {
      throw new NotFoundException('could not create Request');

    }
  }

  async getAllRequests(): Promise<Request[]> {
    return this._requestModel.find({});
  }

  async getAllRequestsByUserType(userType: number, Email: string): Promise<Request[]> {
    if (userType == 1) {
      return await this._requestModel.find({ 'friendsConfirmation.email': Email }).exec();
    } else if (userType == 0) {
      return await this._requestModel.find({ 'email': Email }).exec();
    }
  }

  async getRequestsByStatus(userType: number, confirmationStatus: number, email: string): Promise<Request[]> {
    //friendMember
    if (userType == 1) {

      const requests = await this._requestModel.find({
        'confirmationStatus': confirmationStatus,
        'friendsConfirmation.email': email,
      }).exec();

      const requestAfterFilter = [];
      for (let i = 0; i < requests.length; i++) {
        for (let j = 0; j < requests[i].friendsConfirmation.length; j++) {
          if (requests[i].friendsConfirmation[j].email == email && requests[i].friendsConfirmation[j].confirm == 0) {
            requestAfterFilter.push(requests[i]);
          }
        }
      }
      return requestAfterFilter;

//'walletMember'
    } else if (userType == 0) {
      return await this._requestModel.find({ 'email': email, 'confirmationStatus': { $in: [0, 1] } }).exec();
    }
  }

  async getRequestById(id: string): Promise<Request> {
    return this._requestModel.findOne({ '_id': id }).exec();
  }

  async reactToRequest(id: string, email: string, confirmationStatus: number) {
    let request;
    try {
      request = await this.getRequestById(id);
      for (let i = 0; i < request.friendsConfirmation.length; i++) {
        if (request.friendsConfirmation[i].email == email) {
          request.friendsConfirmation[i].confirm = confirmationStatus;
        }
      }
      request.save();
      const user = await this._userService.getUserByEmail(request.email);

      await this.sendMl(request, user);

      return 'Answer received';
    } catch (e) {
      throw new NotFoundException('could not find Request');
    }
  }

  private async isRequestApprove(id: string) {
    const request = await this.getRequestById(id);
    const totalFriends: number = request.friendsConfirmation.length;
    const approvedNum: number = request.friendsConfirmation.map(o => o[1] == true).length;
    if (totalFriends < 2 * approvedNum) {
      request.confirmationStatus = 1;
      await request.save();

      const mail: Mail = {
        sendTo: request.email,
        subject: 'Your request has been approved',
        content: 'Your request to buy ' + request.description + 'has been approved :) ',

      };
      await this._mailService.sendMail(mail);
    }
  }

  async approveByPass(userId: string, requestId:string): Promise<string> {
    const request = await this.getRequestById(requestId);
    const user = await this._userModel.findById(userId);
    if (user.passes > 0) {
      request.confirmationStatus = 1;
      await request.save();
      user.passes = user.passes - 1;
      await user.save();
      const mail: Mail = {
        sendTo: request.email,
        subject: 'Your request has been approved',
        content: 'Your request to buy ' + request.description + ' has been approved :) ',
      };
      await this._mailService.sendMail(mail);

      return 'Request has been approved';
    }
    return 'User dont have passes';
  }

  async approveByML(requestId): Promise<string> {
    const request = await this.getRequestById(requestId);
    request.confirmationStatus = 1;
    await request.save();
    const mail: Mail = {
      sendTo: request.email,
      subject: 'Your request has been approved',
      content: 'Your request to buy ' + request.description + ' has been approved :) ',
    };
    await this._mailService.sendMail(mail);
    return 'Request ' + requestId + ' has been approved';
  }

  async insertScore(requestId: string, score: number): Promise<string> {
    let request;
    try {
      request = await this.getRequestById(requestId);
    } catch (e) {
      throw new NotFoundException('The request has not found');
    }
    request.botScore = score;
    await request.save();
    const mlServer = 'http://b820cdb00bca.ngrok.io/req';

    const user = await this._userService.getUserByEmail(request.email);
    const requests = await this.getAllRequestsByUserType(0, request.email);
    const categories = await this._categoriesService.getCategories();
    this.httpService.post(mlServer, {
      'the_request': request,
      'Request': requests,
      'User': user,
      'categories': categories,
    });

    return 'botScore insert correctly';
  }

  async moneySavedSinceEver(email: string): Promise<number> {
    const requests: Request[] = await this._requestModel.find({
      'email': email,
      'confirmationStatus': { $in: [0, 3] },
    });
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
    return await this._requestModel.find({ 'email': email, category: category }).exec();
  }

  async howMuchISpentThisMonth(email: string) {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    const requests: Request[] = await this._requestModel.find({
      'email': email,
      'confirmationStatus': 2,
      'openedDate': { $lt: new Date(), $gt: new Date(year + ',' + month) },
    }).exec();

    try {
      if (requests.length != 0) {
        return requests.map(r => r.cost).reduce(function(a: number, b: number) {
          return a + b;
        });
      } else {
        return 0;
      }
    } catch (e) {
      throw new NotFoundException(e);
    }

  }

  async completedRequest(requestId) {
    const request = await this.getRequestById(requestId);
    request.confirmationStatus = 2;
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
    } catch (e) {
      throw new NotFoundException('the Request has not deleted');
    }
  }

  async getRequestByOpenDate(userType: number, email: string, openDate: number): Promise<Request[]> {

    if (userType == 0) {
      return await this._requestModel.find({ 'openDate': openDate, 'email': email }).exec();

    } else if (userType == 1) {

      return await this._requestModel.find({
        'openDate': openDate,
        'friendsConfirmation.email': { $contains: email },
      }).exec();
    }
  }

  async getRequestByClosedDate(userType: number, email: string, closedDate: number): Promise<Request[]> {

    if (userType == 0) {
      return await this._requestModel.find({ 'closedDate': closedDate, 'email': email }).exec();

    } else if (userType == 1) {

      return await this._requestModel.find({
        'closedDate': closedDate,
        'friendsConfirmation.email': { $contains: email },
      }).exec();
    }
  }

  async remindFriends(requestId: string) {
    const request = await this.getRequestById(requestId);

    const emails = request.friendsConfirmation.map(o => o.email);

    await this._mailService.sendMails(emails, 'reminder to approve request', 'we remind you to response to ' + request.email + ' request');

    return 'reminders were sends';
  }

  async getApproveVsAll(email: string) {
    const allRequest = await this._requestModel.find({
      'email': email,
    }).countDocuments().exec();

    const approve = await this._requestModel.find({
      'email': email,
      'confirmationStatus': { $in: [1, 2] },
    }).countDocuments().exec();

    if (allRequest != 0)
      return approve / allRequest;
  }

  async getExpenseByCategory(email: string) {
    const t = await this._requestModel.aggregate([
      { $match: { 'email': email, 'confirmationStatus': 2 } },
      { $group: { category: '$category', total: { $sum: '$cost' } } },
    ]).exec(function(e, d) {
      console.log(d);
    });
    return t;

  }

  async getApprovedVsDenied(email: string) {
    const approve = await this._requestModel.find({
      'email': email,
      'confirmationStatus': { $in: [1, 2] },
    }).countDocuments().exec();

    const Denied = await this._requestModel.find({
      'email': email,
      'confirmationStatus': { $in: [0, 3] },
    }).countDocuments().exec();

    return {
      'Approved': approve,
      'Denied': Denied,
    };


  }


}














