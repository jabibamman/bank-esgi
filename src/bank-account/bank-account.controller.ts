import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccount } from './../entity/bankaccount.entity';

@Controller('users')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}
  @Put(':id/accounts/debit')
  debit(@Param('id') id: number, @Body() entity: BankAccount) {
    return this.bankAccountService.debit(id, entity.solde);
  }

  @Put(':id/accounts/credit')
  credit(@Param('id') id: number, @Body() entity: BankAccount) {
    return this.bankAccountService.credit(id, entity.solde);
  }
}
