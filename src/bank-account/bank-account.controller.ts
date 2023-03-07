import { Controller, Get, Param } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';

@Controller('users')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}
}
