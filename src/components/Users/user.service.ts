import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { UserDto, WalletMemberDto } from './dto/user.dto';
import { encryption } from '../Common/encryption';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {
  }

  async insertUser(userDto: UserDto): Promise<User> {
    try {
      const newUser = new this._userModel(userDto);
      return await newUser.save();
    } catch (e) {
      throw new NotFoundException('The Users were not insert correctly ');
    }
  }

  async getUserById(userId: string): Promise<User> {
    let user;
    try {
      user = await this._userModel.findById(userId).exec();
    } catch (e) {
      throw new NotFoundException(e);
    }
    if (!user) {
      throw new NotFoundException('could not find user');
    }
    return user._doc;
  }

  async getUserByPassword(userEmail: string, userPassword: string): Promise<User> {
    const user = await this._userModel.findOne({ 'email': userEmail}).exec();
    const decryptedPassword = encryption.decrypt(user.password);

    if (!user || decryptedPassword !== userPassword ) {
      throw new NotFoundException('The Email or Password are incorrect');
    }
    return user;
  }

  async isPasswordAnswerCorrect(email: string, answer: string) {
    let user;
    try {
      user = await this._userModel.findOne({ email: email }).exec();
      return encryption.decrypt(user.answerPassword) == answer;
    } catch (e) {
      throw new NotFoundException('could not find user');
    }
  }

  async updatePassword(email: string, newPassword: string) {
    const user: User = await this._userModel.findOne({ email: email }).exec();
    user.password = newPassword;
    await user.save();
    return 'Password updated successfully';
  }

  async updateUser(walletMemberDto: WalletMemberDto): Promise<User> {
    try {
      const updateUser = await this._userModel.findById(walletMemberDto.id).exec();
      if (walletMemberDto.maritalStatus) {
        updateUser.maritalStatus = walletMemberDto.maritalStatus;
      }
      if (walletMemberDto.walletMember) {
        updateUser.walletMember = walletMemberDto.walletMember;
        if (!updateUser.stripeCardId) {
          // Move after this will be a real stripe account.
          //walletMemberDto.stripeCardId = await stripeData.creatPrepaidCreditCard(updateUser);
          walletMemberDto.stripeCardId = 'tok_mastercard_prepaid';
        }
      }
      if (walletMemberDto.addictedStatus) {
        updateUser.addictedStatus = walletMemberDto.addictedStatus;
      }
      if (walletMemberDto.myTarget) {
        updateUser.myTarget = walletMemberDto.myTarget;
      }
      if (walletMemberDto.myFixedIncomes) {
        updateUser.myFixedIncomes = walletMemberDto.myFixedIncomes;
      }
      if (walletMemberDto.myFixedExpenses) {
        updateUser.myFixedExpenses = walletMemberDto.myFixedExpenses;
      }
      if (walletMemberDto.creditCardId) {
        updateUser.creditCardId = walletMemberDto.creditCardId;
      }
      if (walletMemberDto.stripeCardId) {
        updateUser.stripeCardId = walletMemberDto.stripeCardId;
      }
      await updateUser.save();
      return updateUser;
    } catch (e) {
      throw new NotFoundException('The Users were not update');
    }
  }

  async addWalletFriend(userId: string, friendEmail: string) {
    try {
      await this.getUserByEmail(friendEmail);
    } catch (e) {
      throw new NotFoundException('The Friend user were not found');

    }
    const user: User = await this._userModel.findById(userId).exec();
    for (let i = 0; i < user.myWalletMembers.length; i++) {
      if (user.myWalletMembers[i] = friendEmail) {
        throw new NotFoundException('The friend you are trying to add is already in the WalletMember');
      }
    }

    user.myWalletMembers.push(friendEmail);
    await user.save();
    return user;
  }

  async getUsersByEmails(emails: string[]): Promise<any> {
    try {
      return await this._userModel.find({ 'email': { $in: emails } }).exec();
    } catch (e) {
      throw new NotFoundException('The Users were not found');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this._userModel.findOne({ 'email': email });
    } catch (e) {
      throw new NotFoundException('The User were not found');
    }
  }

  async updatePasses(email: string) {
    const user = await this.getUserByEmail(email);
    const currentMonth = new Date(Date.now()).getMonth() + 1;
    if (user.updatePassedMonth != currentMonth) {
      user.passes = user.addictedStatus;
      user.updatePassedMonth = currentMonth;
      await user.save();
    }
  }
}





