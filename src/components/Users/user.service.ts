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

  async checkIfEmailIsAvailable(email: string): Promise<boolean> {
    const user = await this._userModel.findOne({ 'email': email }).exec().then();
    return !user;

  }

  async insertUser(userDto: UserDto): Promise<User> {
    try {
      const available = await this.checkIfEmailIsAvailable(userDto.email);

      if (available) {
        const newUser = new this._userModel(userDto);
        return await newUser.save();


      } else {
        throw new NotFoundException('The Email you insert already exist ');
      }

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
    const user = await this._userModel.findOne({ 'email': userEmail }).exec();
    if (user) {
      const decryptedPassword = encryption.decrypt(user.password);


      if (!user || decryptedPassword !== userPassword) {
        throw new NotFoundException('The Email or Password are incorrect');
      }
      return user;
    } else {
      throw new NotFoundException('The Email or Password are incorrect');
    }
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
    if (user) {
      user.password = newPassword;
      await user.save();
      return 'Password updated successfully';
    }else{
      throw new NotFoundException('the Email you send is empty or not exists')
    }
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
    if (user.updatePassesMonth != currentMonth) {
      user.passes = user.addictedStatus;
      user.updatePassesMonth = currentMonth;
      await user.save();
    }
  }

  async whoFriendIam(email: string): Promise<string[]> {
    const users = await this._userModel.find({
      'myWalletMembers': email,
    }).exec();

    const emails = [];

    for (let i = 0; i < users.length; i++) {
      emails.push(users[i].email);
    }

    return emails;
  }

  async getUserInfo(email: string) {
    const user = await this._userModel.findOne({ 'email': email }).exec();
    return {
      'fullName': user.firstName + ' ' + user.lastName,
      'email': user.email,
      'phoneNumber': user.phoneNumber,
    };
  }

  async getUsersInfoByWalletEmail(email: string) {
    const user = await this.getUserByEmail(email);
    const m = user.myWalletMembers;
    const usersInfo = [];
    for (let i = 0; i < m.length; i++) {
      usersInfo.push(await this.getUserInfo(m[i]));
    }
    return usersInfo;
  }

  async addWalletFriend(userId: string, friendEmail: string) {
    try {
      if (friendEmail == '') {
        throw new NotFoundException('The email is empty');
      }
      // const available = await this.checkIfEmailIsAvailable(friendEmail);
      const friendEmailUser = await this.getUserByEmail(friendEmail);

      if (friendEmailUser) {
        const user: User = await this._userModel.findById(userId).exec().then();
        for (let i = 0; i < user.myWalletMembers.length; i++) {
          if (user.myWalletMembers[i] == friendEmail) {
            throw new NotFoundException('The friend you are trying to add is already in the WalletMember');
          }
        }
        user.myWalletMembers.push(friendEmail);
        await user.save();

        return {
          'email': friendEmailUser.email,
          'fullName': friendEmailUser.firstName + ' ' + friendEmailUser.lastName,
          'PhoneNumber': friendEmailUser.phoneNumber,
        };

      }
    } catch (e) {
      throw new NotFoundException(e + ' The Friend user were not found');
    }
  }

  async deleteWalletFriend(userId: string, friendEmail: string) {
    try {
      const user = await this._userModel.findById(userId).exec().then();
      user.myWalletMembers = user.myWalletMembers.filter(email => email != friendEmail);
      await user.save();

      const friendEmailUser = await this.getUserByEmail(friendEmail);
      return {
        'email': friendEmailUser.email,
        'fullName': friendEmailUser.firstName + ' ' + friendEmailUser.lastName,
        'PhoneNumber': friendEmailUser.phoneNumber,
      };

    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async getPasses(email: string) {
    const user = await this.getUserByEmail(email);
    return user.passes;
  }
}





