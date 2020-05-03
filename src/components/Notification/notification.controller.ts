import { Body, Controller, Patch } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {


  @Patch()
  createNotification(@Body('notification') notificationDto:NotificationDto):any{

  }

}
