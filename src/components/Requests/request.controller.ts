import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.model';

@Controller('request')
export class RequestController {
  constructor(private _requestModel: RequestService) {
  }

  // Get request by userType (walletMember, FriendMember)
  @Get('All')
  async getAllRequests(@Param('userType') userType: string, @Param('email') email: string): Promise<Request[]> {
    return await this._requestModel.getRequests(userType, 'All', email);
  }

  // Get request by userType (walletMember, FriendMember) & confirmationStatus (open,approved,inProcess) & email
  @Get(':userType&:confirmationStatus&:email')
  async getRequestByConfirmationStatus(@Param('confirmationStatus') confirmationStatus: string,
                                       @Param('userType') userType: string,
                                       @Param('email') email: string): Promise<Request[]> {
    return await this._requestModel.getRequests(userType, confirmationStatus, email);
  }

  @Get(':id')
  async getRequest(@Param('id') id: string): Promise<Request> {
    return await this._requestModel.getRequestById(id);
  }


  @Patch()
  async createRequest(@Body('request') requestDto: RequestDto): Promise<string> {
    return this._requestModel.createRequest(requestDto);
  }

  //for approve of friendMember
  @Post(':id&email&:answer')
  async ReactToRequest(@Param('id') id: string, @Param('email') email: string, @Param('answer') answer: string): Promise<string> {
    return await this._requestModel.reactToRequest(id, email, answer);
  }

  // approve request by the passes,
  // it checks if the user have passes and if he have i am down the passes by 1 and change the confirmationStatus to Approve
  @Post(':userId&:requestId')
  async ApproveByPasses(@Param('userId') userId: string,
                        @Param('RequestId') requestId: string): Promise<string> {

    return this._requestModel.approveByPass(userId, requestId);
  }
}
