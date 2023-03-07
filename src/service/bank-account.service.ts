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

    async getAccountFromId(id: number): Promise<BankAccount> {
        const account = await this.bankAccountRepository.findOne({ where: { id } });
        return account;
    } 

    async getAccountsFromUserId(id: number): Promise<BankAccount[]> {
        const accounts = await this.bankAccountRepository.find({ where: { userId: id } });
        return accounts;
    }
}

