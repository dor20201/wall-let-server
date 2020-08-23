import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.model';
import { BotService } from '../Bot/bot.service';

@Controller('request')
export class RequestController {
  constructor(private _requestModel: RequestService) {
  }

  // Get request by userType (walletMember, friendMember)
  @Post('all')
  async getAllRequests(@Body('userType') userType: number,
                       @Body('email') email: string): Promise<Request[]> {
    return await this._requestModel.getAllRequestsByUserType(userType, email);
  }


  @Get(':email')
  async getRequestIApproved(@Param('email') email: string): Promise<Request[]> {
    return this._requestModel.requestsIApproved(email);
  }

  @Post('getRequestByCategory')
  async getRequestsByCategory(@Body('email') email: string,
                              @Body('category') category: string): Promise<Request[]> {
    return this._requestModel.requestsByCategory(email, category);
  }

  // Get request by userType (walletMember=0, FriendMember=1) & confirmationStatus (true,false) & email
  @Post('getRequestByConfirmationStatus')
  async getRequestByConfirmationStatus(@Body('confirmationStatus') confirmationStatus: number,
                                       @Body('userType') userType: number,
                                       @Body('email') email: string): Promise<Request[]> {
    return await this._requestModel.getRequestsByStatus(userType, confirmationStatus, email);
  }

  @Get(':id')
  async getRequest(@Param('id') id: string): Promise<Request> {
    return await this._requestModel.getRequestById(id);
  }

  @Get('getRequestByOpenDate')
  async getRequestByOpenDate(@Body('userType') userType: number,
                             @Body('email') email: string,
                             @Body('openDate') openDate: number): Promise<Request[]> {
    return await this._requestModel.getRequestByOpenDate(userType, email, openDate);
  }

  @Get('getRequestByClosedDate')
  async getRequestByClosedDate(@Body('userType') userType: number,
                               @Body('email') email: string,
                               @Body('closedDate') closedDate: number): Promise<Request[]> {
    return await this._requestModel.getRequestByClosedDate(userType, email, closedDate);
  }

  @Patch()
  async createRequest(@Body('request') requestDto: RequestDto): Promise<Request> {
    return this._requestModel.createRequest(requestDto);
  }

  //for approve of friendMember
  @Post('ReactToRequest')
  async ReactToRequest(@Body('id') id: string,
                       @Body('email') email: string,
                       @Body('confirmationStatus') confirmationStatus: number): Promise<string> {
    return await this._requestModel.reactToRequest(id, email, confirmationStatus);
  }

  // approve request by the passes,
  // it checks if the user have passes and if he have i am down the passes by 1 and change the confirmationStatus to Approve
  @Post('approveByPasses')
  async ApproveByPasses(@Body('userId') userId: string,
                        @Body('requestId') requestId: string): Promise<string> {

    return this._requestModel.approveByPass(userId, requestId);
  }

  @Post('approveByML')
  async ApproveByML(@Body('requestId') requestId: string): Promise<string> {
    return this._requestModel.approveByML(requestId);
  }

  @Post('updateRequest')
  async UpdateRequest(@Body('requestDto') requestDto: RequestDto): Promise<Request> {
    return await this._requestModel.updateRequest(requestDto);
  }

  @Post('deleteRequest')
  async DeleteRequest(@Body('id') id: string): Promise<string> {
    return this._requestModel.deleteRequest(id);
  }

  @Post('remindFriend')
  async remindFriend(@Body('requestId') requestId: string): Promise<string> {
    return await this._requestModel.remindFriends(requestId);
  }

}
