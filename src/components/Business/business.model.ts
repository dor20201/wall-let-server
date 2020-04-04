export class Product {
    id: string;
    title: string;
    descriptaion: string;
    price: number;

    constructor(id: string, title: string, desc: string, price: number) {
       this.id= id;
       this.title = title;
       this.descriptaion = desc;
       this.price = price;

    }

}
