import {Controller,Post,Body} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController{
    constructor(private usersService: UsersService){}
    @Post('createUser')
    createUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ){
      return this.usersService.createUser(name,email,password)
    }

    @Post('login')
    async loginUser(
      @Body('email') email: string,
      @Body('password') password: string
    ){
     return await this.usersService.loginUser(email,password);
    }
}