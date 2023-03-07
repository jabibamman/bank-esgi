import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../entity/bankaccount.entity';

@Injectable()
export class BankAccountService {
  getAccounts(id: number): import("../entity/user.entity").User | PromiseLike<import("../entity/user.entity").User> {
    throw new Error('Method not implemented.');
  }
}
