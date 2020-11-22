import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './products.model'

@Injectable()
export class ProductsService{
    products: Product[] = [];
    insertProduct(title: string, descri: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId,title,descri,price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    async  getProductById(productId: string){
       const [product,index] = this.findProduct(productId);
       if(!product){
           throw new NotFoundException("Product not found");
         } 
       return {...product};
    }

      updateProduct(id:string, title: string, desc: string, price: number){
         const [product,index] = this.findProduct(id);
         const updatedProduct = {...product};

         if(title){
             updatedProduct.title = title;
         }
         if(desc){
             updatedProduct.description = title;
         }
         if(price){
             updatedProduct.price = price;
         }
         return this.products[index] = updatedProduct;
        
      }

    

    removeProduct(productId: string){
        const [product,index] = this.findProduct(productId);
        this.products.splice(index,1);
        return product;
    } 
     findProduct(productId: string):[Product,number]{
        const index = this.products.findIndex(prod => prod.id == productId);  
        const product = this.products[index];
        if(!product)
        throw new NotFoundException('Product not found');
        return [product,index];
    }
}