import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {
  }

  @Post()
  addBusiness(@Body('businessName') businessName: string,
              @Body('category') category: string) {
    this.businessService.insertBusiness(businessName, category, 62);
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
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number): any {
    this.businessService.updateBusiness(prodId, prodTitle, prodDescription, prodPrice);

    return;
    null;
  }

  @Delete(':id')
  deleteBusiness(@Param('id')prodId: string) {
    this.businessService.deleteBusinessById(prodId);
    return null;
  }
}
