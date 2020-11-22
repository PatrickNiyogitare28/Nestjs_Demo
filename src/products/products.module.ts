import { ProductsService } from './products.service';
import {Module} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {MongooseModule, Schema} from '@nestjs/mongoose';
import {ProductSchema} from './products.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule{

}