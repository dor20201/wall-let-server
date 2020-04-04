import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./business.model";

@Injectable()
export class BusinessService {
  private products: Product[] = [];


  findBusiness(prodId: string):[Product ,number] {
    const prodIndex = this.products.findIndex((prod) => prod.id == prodId);
    const product = this.products[prodIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, prodIndex];
  }
  insertBusiness(businessName: string, category: string, price: number) {
    const newProduct = new Product(Math.random().toString(), businessName, category, price);
    this.products.push(newProduct);
    return newProduct.id;
  }

  getBusiness() {
    return [...this.products]
  }

  getBusinessById(prodId: string) {
    const prod = this.findBusiness(prodId)[0];
    if (!prod) {
      throw new NotFoundException('Product was not found.');
    }
    return {...prod};
  }

  updateBusiness(prodId: string, prodTitle: string, prodDes: string, prodPrice: number) {
    const product = this.findBusiness(prodId)[0];
    const index = this.findBusiness(prodId)[1];

    const updateProduct = {...product};
    if(prodTitle){
      updateProduct.title = prodTitle;
    }
    if(prodDes){
      updateProduct.descriptaion = prodDes;
    }
    if (prodPrice){
      updateProduct.price=prodPrice;
    }

    this.products[index] = updateProduct;
  }

  deleteBusinessById(id: any) {
    const index =this.findBusiness(id)[1];
    this.products.splice(index,1);
  }
}
