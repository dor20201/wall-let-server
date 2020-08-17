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


      let mail: Mail;

      for (const email of emails) {
        mail = {
          sendTo: email,
          subject: subject,
          content: text,
        };
        await this.sendMail(mail);
        return 'Sending mails succeed';
      }
    } catch (e) {
      throw new NotFoundException('Could not send mails');
    }


  }
}
