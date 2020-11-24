import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(req.header('user'))  
    throw new UnauthorizedException('Login to continue.');  
  }
}

export class AdminMiddleware implements NestMiddleware{
  use(req: Request, res: Response, next: Function) {
    console.log(req.header('user'))  
    throw new UnauthorizedException('Login to continue');  
  }
}