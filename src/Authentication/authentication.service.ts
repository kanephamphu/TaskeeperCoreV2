import { Injectable } from "@nestjs/common";
import { Authentication } from "src/Interfaces/Authentication/authentication.interface";

@Injectable()
export class AuthenticationService{
    private readonly authentication: Authentication;

    findOne(){
        return ;
    }
}