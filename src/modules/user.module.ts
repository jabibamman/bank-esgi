import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { BankAccountService } from 'src/service/bank-account.service';
import { UserController } from '../api/user.controller';
import { BankAccount } from 'src/entity/bankaccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankAccount])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
