import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import { UserController } from './user.controller';
import { BankAccount } from 'src/entity/bankaccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankAccount])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
