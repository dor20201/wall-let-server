import {Body, Controller, Post} from "@nestjs/common";
import {MailService} from "./mail.service";
import {Mail} from "./mail.model";

@Controller('Mail')
export class MailController{
    constructor(private readonly _mailService:MailService) {}

    @Post()
    sendMail(@Body('Mail') mail:Mail):any{
       return this._mailService.sendMail(mail);
    }
}
