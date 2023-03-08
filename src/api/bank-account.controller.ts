import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BankAccountService } from '../service/bank-account.service';

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

  @Put('debit/:id')
  debit(@Param('id') id: number, @Body() body: any) {
    return this.bankAccountService.debit(id, parseFloat(body.amount));
  }

  @Put('credit/:id')
  credit(@Param('id') id: number, @Body() body: any) {
    return this.bankAccountService.credit(id, parseFloat(body.amount));
  }
}
