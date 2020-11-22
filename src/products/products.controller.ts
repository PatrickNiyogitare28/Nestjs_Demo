import {Controller, Post, Body, Get,Patch,Delete,Param} from '@nestjs/common';
import { ProductsService } from './products.service';

    @Controller('products')
    export class ProductsController{
        constructor(private readonly productService: ProductsService){}
        @Post()
        async addProduct(
            @Body('title') prodTitle: string,
            @Body('description') prodDescription: string,
            @Body('price') prodPrice: number
        ){
          const result =   await this.productService.insertProduct(prodTitle,prodDescription,prodPrice);
          return result
        }

        @Get()
        getProducts(){
          return this.productService.getProducts();
            
        }

        @Get(':id')
        getProductById(
            @Param('id') id: string
        ){
        return this.productService.getProductById(id);
        }

        @Patch(':id')
        async updateProduct(
            @Param('id') id: string,
            @Body('title') title: string,
            @Body('description') desc: string,
            @Body('price') price: number
        ){
         const updateProduct = await this.productService.updateProduct(id,title,desc,price);
         return updateProduct;
        }

        @Delete(':id')
        async removeProduct(
            @Param('id') id: string
        ){
            const removedProduct = await this.productService.removeProduct(id);
            return {
                success: true,
                message: 'Product Removed',
                product: removedProduct
            }
        }
        
    }