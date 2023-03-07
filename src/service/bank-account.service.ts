import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from 'src/entity/bankaccount.entity';
import { log } from 'console';
import { UserService } from './user.service';
import { ConstantsService } from './constants.service';

@Injectable()
export class BankAccountService {
    constructor(
        @InjectRepository(BankAccount)
        private bankAccountRepository: Repository<BankAccount>,    
        private userService: UserService, 
        private Constants: ConstantsService
    ) {}

    findAll(): Promise<BankAccount[]> {
        return this.bankAccountRepository.find();
      }

    async getAccountFromId(id: number): Promise<BankAccount> {
        const account = await this.bankAccountRepository.findOne({ where: { id } });
        return account;
    } 

    async getAccountsFromUserId(id: number): Promise<BankAccount[] | { status: number, message: string }> {
        const accounts = await this.bankAccountRepository.find({ where: { userId: id } });
        if (this.userService.hasTooManyAccounts(accounts)) {
            return {
                status: HttpStatus.OK,
                message: 'User has too many accounts (' + accounts.length + ') and the maximum is ' + this.Constants.MAX_ACCOUNTS_PER_USER,
            };

        }

        return accounts;
    }

    isAccountValid(account: BankAccount): boolean {
        if (account.solde <= this.Constants.MIN_ACCOUNT_BALANCE || account.solde > this.Constants.MAX_ACCOUNT_BALANCE) {
            return false;
        }

        return true;
    }
}

