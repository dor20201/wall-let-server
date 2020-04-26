import { Injectable, NotFoundException } from '@nestjs/common';
import { Business } from './business.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Users/user.model';

@Injectable()
export class BusinessService {

  constructor(@InjectModel('Business') private readonly BusinessModel: Model<Business>) {
  }

  findBusiness(prodId: string) {

  }

  async insertBusiness(name: string, category: string, financial: [{ string: number }]) {
    const newBusiness = new this.BusinessModel({
      name,
      category,
      financial,
    });
    const result = await newBusiness.save();
    return result._id;

  }

  getBusiness() {

  }

  async getBusinessById(businessId: string): Promise<Business> {
    let business;
    try {
      business = await this.BusinessModel.findById(businessId).exec();
    } catch (e) {
      throw new NotFoundException('could not find user');
    }
    if (!business) {
      throw new NotFoundException('could not find user');
    }
    return business;
  }

  async updateBusiness(businessId: string, name: string, category: string, financial: [{ string: number }]) {
    const updateBusiness = await this.getBusinessById(businessId);
    if (name) {
      updateBusiness.name = name;
    }
    if (category) {
      updateBusiness.category = category;
    }
    if (financial) {
      updateBusiness.financial = financial;
    }

    const result = await updateBusiness.save();
    return null;
  }

  async deleteBusinessById(businessId: any) {
    await this.BusinessModel.deleteOne(businessId);
    return null;
  }
}
