import {Body, Controller, Post} from "@nestjs/common";
import {MailService} from "./mail.service";
import {Mail} from "./mail.model";

@Controller('mail')
export class MailController{
    constructor(private readonly _mailService:MailService) {}

    @Post()
    sendMail(@Body('mail') mail:Mail):any{
       return this._mailService.sendMail(mail);
    }
}
