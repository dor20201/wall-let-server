import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {
  }

  @Post()
  addBusiness(@Body('name') businessName: string,
              @Body('category') category: string,
              @Body('financial') financial: [{string:number}]) {
    this.businessService.insertBusiness(businessName, category, financial).then();
  }

  @Get()
  getAllBusiness() {
    return this.businessService.getBusiness();
  }

  @Get(':id')
  getBusiness(@Param('id')businessId: string) {
    return this.businessService.getBusinessById(businessId);
  }

  @Patch(':id')
  updateBusiness(
    @Param('id') prodId: string,
    @Body('name') businessName: string,
    @Body('category') category: string,
    @Body('financial') financial: [{string:number}]): any {
    this.businessService.updateBusiness(prodId, businessName, category, financial).then();
    return null;
  }

  @Delete(':id')
  deleteBusiness(@Param('id')prodId: string) {
    this.businessService.deleteBusinessById(prodId).then();
    return null;
  }
}
