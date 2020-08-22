import { Get, Injectable, Param, Post } from '@nestjs/common';
import { RequestService } from '../Requests/request.service';
import { QuestionService } from '../Question/question.service';
import { QuestionDto } from '../Question/dto/question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../Users/user.model';

@Injectable()
export class BotService {


}
