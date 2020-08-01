import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.model';

@Controller('request')
export class RequestController {
  constructor(private _requestModel: RequestService) {
  }

  // Get request by userType (walletMember, friendMember)
  @Post('all')
  async getAllRequests(@Body('userType') userType: string,
                       @Body('email') email: string): Promise<Request[]> {
    return await this._requestModel.getRequests(userType, 'All', email);
  }


  @Get(':email')
  async getRequestIApproved(@Param('email') email: string): Promise<Request[]> {
    return this._requestModel.requestsIApproved(email);
  }

  @Post('getRequestByCategory')
  async getRequestsByCategory(@Body('email') email: string,
                              @Body('category') category: string): Promise<Request[]> {
    return this._requestModel.requestsByCategory(email,category);
  }

  @Post('getRequestByStatus')
  async getRequestsByStatus(@Body('email') email: string,
                            @Body('status') status: string): Promise<Request[]> {
    return this._requestModel.requestsByStatus(email, status);
  }

  // Get request by userType (walletMember, FriendMember) & confirmationStatus (open,approved,inProcess) & email
  @Post('getRequestByConfirmationStatus')
  async getRequestByConfirmationStatus(@Body('confirmationStatus') confirmationStatus: string,
                                       @Body('userType') userType: string,
                                       @Body('email') email: string): Promise<Request[]> {
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
  @Post('ReactToRequest')
  async ReactToRequest(@Body('id') id: string,
                       @Body('email') email: string,
                       @Body('answer') answer: string): Promise<string> {
    return await this._requestModel.reactToRequest(id, email, answer);
  }

  // approve request by the passes,
  // it checks if the user have passes and if he have i am down the passes by 1 and change the confirmationStatus to Approve
  @Post('approveByPasses')
  async ApproveByPasses(@Body('userId') userId: string,
                        @Body('RequestId') requestId: string): Promise<string> {

    return this._requestModel.approveByPass(userId, requestId);
  }
}
