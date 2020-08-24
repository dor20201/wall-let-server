import { Injectable, NotFoundException } from '@nestjs/common';
import { Mail } from './mail.model';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  async sendMail(mail: Mail): Promise<any> {

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'dor20201@cs.colman.ac.il', // generated ethereal user
        pass: 'opqzoitcbwjajqvh', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send Mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Wallet-app" <dor20201@gmail.com>', // sender address
      to: mail.sendTo, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.content, // plain text body
    });

  }


  async sendMails(emails: string[], subject: string, text: string): Promise<string> {
    try {
      for (const e of emails) {
        if (e != "") {
          await this.sendMail({
            'sendTo': e,
            'subject': subject,
            'content': text,
          });
        }else {
          return 'you dont have any friends ';

        }
        return 'Sending mails succeed';
      }
    } catch (e) {
      throw new NotFoundException('Could not send mails');
    }


  }
}
