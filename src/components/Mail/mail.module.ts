import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { UserService } from '../Users/user.service';

@Module({
    imports: [],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService],

  },
)
export class MailModule {
}
