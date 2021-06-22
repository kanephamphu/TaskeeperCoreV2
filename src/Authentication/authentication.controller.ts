import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('authentication')
export class AuthenticationController{
    @Post()
    @HttpCode(200)
    authentication(){
        
    }
}