import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class ValidatedUserData{
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

     @IsNotEmpty()
     @Length(3, 30)
     name: string;
}