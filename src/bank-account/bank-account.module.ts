import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { BankAccount } from '../entity/bankaccount.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankAccount])],
  controllers: [BankAccountController],
  exports: [TypeOrmModule, BankAccountService],
})
export class BankAccountModule {}
