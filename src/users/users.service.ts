import {User} from './users.model';
export class UsersService{
   constructor(){}
    users:User[] = [];

    createUser(name:string, email: string, password: string){
     const newUser = new User(Math.random().toString(),name,email,password);
     this.users.push(newUser);
     return {
         success: true,
         message: 'User created',
         user: newUser
     }   
   }
};