import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    getAllUsers() {
        return this.userService.findAll();
    }

    @Get(':id')
    getAccounts(@Param('id') id: number) {
        return this.userService.findOneUser(id);
    }

    @Get(':id/name')
    getUserName(@Param('id') id: number) {
        return this.userService.getUserName(id);
    }

}
