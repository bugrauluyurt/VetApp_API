import * as express from 'express';
import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req, Res
} from 'routing-controllers';
import { AuthService } from 'src/auth/AuthService';

import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Authorized()
@JsonController('/authentication')
export class AuthenticationController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('/signin')
    public findeOne(@Param('username') username: string, @Param('password') password: string, @Res() res: express.Response): Promise<User> {
        return this.authService.validateUser(username, password);
    }

    @Post('/signup')
    public create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

}
