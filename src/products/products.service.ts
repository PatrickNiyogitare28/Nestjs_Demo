import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './products.model'
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class ProductsService{
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}
    products: Product[] = [];

    async insertProduct(title: string, descri: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description:descri,
            price
        });
       const result = await newProduct.save();
       return result;
    }

    getProducts(){
       return this.productModel.find();
    }

    async  getProductById(productId: string){
       const product = await this.findProduct(productId);
       return product;
    }

      async updateProduct(id:string, title: string, desc: string, price: number):Promise<Product>{
         const updatedProduct = await this.findProduct(id);
         if(title){
             updatedProduct.title = title;
         }
         if(desc){
             updatedProduct.description = desc
         }
         if(price){
             updatedProduct.price = price
         }

         const result = await updatedProduct.save();
         return result;
      
      }

    

    async removeProduct(productId: string){
      const product = await this.findProduct(productId);
      const result = await this.productModel.findByIdAndDelete(productId);
      return result;
    } 

   private async findProduct(id: string): Promise<Product>{
       let product;
       try{
        product = await this.productModel.findById(id);
        
       }
       catch(error){
        throw new NotFoundException('Product not found');
       }
       if(!product)
       throw new NotFoundException('Product not found');
       return product;
   }
}