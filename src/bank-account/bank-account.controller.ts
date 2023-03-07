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
    getAccounts(@Param('id') id: number) {
        return this.bankAccountService.getAccountsFromUserId(id);
    }
    
}
