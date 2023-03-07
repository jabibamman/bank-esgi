import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from 'src/entity/bankaccount.entity';

@Injectable()
export class BankAccountService {
    constructor(
        @InjectRepository(BankAccount)
        private bankAccountRepository: Repository<BankAccount>,     
    ) {}

    findAll(): Promise<BankAccount[]> {
        return this.bankAccountRepository.find();
      }

    async getAccountsFromUserId(id: number): Promise<BankAccount[]> {
        console.log('getAccounts');
        const accounts = await this.bankAccountRepository.find({ where: { userId: id } });

        return accounts;
    }
}

