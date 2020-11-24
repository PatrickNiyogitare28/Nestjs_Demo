import { ProductsService } from './products.service';
import {Module, MiddlewareConsumer, NestModule, RequestMethod} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {MongooseModule, Schema} from '@nestjs/mongoose';
import {ProductSchema} from './products.model';
import {AuthMiddleware,AdminMiddleware} from '../middlewares/middlewares';



@Module({

    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule implements NestModule{
   configure(consumer: MiddlewareConsumer){
       consumer.apply(AdminMiddleware)
       .forRoutes({path: 'products/:id', method: RequestMethod.DELETE })

   }
}