import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authentication } from 'src/Interfaces/Authentication/authentication.interface';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthService) {

    }

    @Post()
    authentication(@Body() authentication: Authentication) {
        return
    }
}