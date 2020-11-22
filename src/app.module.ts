import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {UsersModule} from './users/users.module';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest_demo'),
    ProductsModule,UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
