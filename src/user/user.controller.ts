import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}


    // users/:id
    // in the browser, go to http://localhost:3000/users/1
    @Get(':id/user')
    getAccounts(@Param('id') id: number) {
        console.log('getAccounts for user ' + id);
        return this.userService.getUserName(id);
    }
}
