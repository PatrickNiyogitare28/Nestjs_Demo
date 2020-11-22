import {NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import {User} from './users.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
export class UsersService{
   constructor(@InjectModel('User') private readonly userModel: Model<User>){}
    users:User[] = [];

    async createUser(name:string, email: string, password: string){
      const user = await this.userModel.findOne({email: email});
      if(user)
      throw new NotAcceptableException('User aready exist.');

     const newUser = await new this.userModel({name, email, password});
     const result = await newUser.save();
     return result;
   }

   async loginUser(email: string, password: string){
     const user = await this.findUser(email);

     if(!(user.password ==  password))
     throw new UnauthorizedException('Invalid Email or Password');
     return {
       success: true,
       message: 'Successfully logged in'
     }
     
   }

   private async findUser(email:string){
     const user = this.userModel.findOne({email: email});
      if(!user)
      throw new UnauthorizedException('Invalid Email or Password');
      return user;

   }
 };