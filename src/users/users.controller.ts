import {Controller,Post,Body,UsePipes,ValidationPipe} from '@nestjs/common';
import {UsersService} from './users.service';
import {ValidatedUserData} from '../utils/user.validator';

@Controller('users')
export class UsersController{
    constructor(private usersService: UsersService){}
    @Post('createUser')
    @UsePipes(new ValidationPipe({ transform: true }))
    createUser(
           @Body() data: ValidatedUserData
        // @Body('name') name: string,
        // @Body('email') email: string,
        // @Body('password') password: string
    ){
      return this.usersService.createUser(data)
    }

    @Post('login')
    async loginUser(
      @Body('email') email: string,
      @Body('password') password: string
    ){
     return await this.usersService.loginUser(email,password);
    }
}