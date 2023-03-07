import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { BankAccount } from '../entity/bankaccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  exports: [TypeOrmModule],
})
export class BankAccountModule {}
