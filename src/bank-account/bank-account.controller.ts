import { Controller, Get, Param } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';

@Controller('accounts')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

    @Get('') 
    getAllAccounts() {
        return this.bankAccountService.findAll();
    } 

    @Get(':id')
    getAccountFromId(@Param('id') id: number) {
        return this.bankAccountService.getAccountFromId(id);
    }

    @Get('user/:id')
    getAccountsFromUserId(@Param('id') id: number) {
        return this.bankAccountService.getAccountsFromUserId(id);
    }

}
