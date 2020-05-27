import {Injectable} from "@nestjs/common";
import {Mail} from "./mail.model";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    async sendMail(mail: Mail): Promise<any> {

        let transporter = nodemailer.createTransport({
            service:"Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'dor20201@gmail.com', // generated ethereal user
                pass: 'vtqrpseyjuuntnon' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Dor Swisa" <dor20201@gmail.com>', // sender address
            to: mail.mailB, // list of receivers
            subject: `test Swisa`, // Subject line
            text: "Swisa coding", // plain text body
        });

    }


}
