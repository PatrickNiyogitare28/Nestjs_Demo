import {Controller, Post, Body, Get,Patch,Delete,Param} from '@nestjs/common';
import { ProductsService } from './products.service';

    @Controller('products')
    export class ProductsController{
        constructor(private readonly productService: ProductsService){}
        @Post()
        addProduct(
            @Body('title') prodTitle: string,
            @Body('description') prodDescription: string,
            @Body('price') prodPrice: number
        ){
          const generatedId =   this.productService.insertProduct(prodTitle,prodDescription,prodPrice);
            return {
                id: generatedId
            }
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
        updateProduct(
            @Param('id') id: string,
            @Body('title') title: string,
            @Body('description') desc: string,
            @Body('price') price: number
        ){
         return this.productService.updateProduct(id,title,desc,price);
        }

        @Delete(':id')
        removeProduct(
            @Param('id') id: string
        ){
            const removedProduct = this.productService.removeProduct(id);
            return {
                success: true,
                message: 'Product Removed',
                product: removedProduct
            }
        }
        
    }