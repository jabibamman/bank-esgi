import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from 'src/entity/bankaccount.entity';
import { UserService } from './user.service';
import { ConstantsService } from './constants.service';

export enum typeOperation {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

@Injectable()
export class BankAccountService {
    private typeOperation = typeOperation;
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

        if (await this.userService.hasTooManyAccounts(accounts) === true) {
            return {
                status: HttpStatus.OK,
                message: 'User has too many accounts (' + accounts.length + ') and the maximum is ' + this.Constants.MAX_ACCOUNTS_PER_USER,
            };

        }

        return accounts;
    }


  async credit(id: number, credit: number) {
    const bankAccount = await this.getAccountFromId(id);
    if (await this.calc(credit, bankAccount.solde, this.typeOperation.CREDIT)) {
      await this.action(credit, bankAccount, this.typeOperation.CREDIT);
    }
    return { credit: credit, solde: bankAccount.solde };
  }


  async debit(id: number, debit: number) {
    const bankAccount = await this.getAccountFromId(id);
    
    if (await this.calc(debit, bankAccount.solde, this.typeOperation.DEBIT)) {
      await this.action(debit, bankAccount, this.typeOperation.DEBIT);
    }
    return { debit: debit, solde: bankAccount.solde };
  }

  async action(
    operation: number,
    bankAccount: BankAccount,
    type: typeOperation,
  ): Promise<void> {

    const newDebit = operation * this.setTax();

    switch (type) {
      case this.typeOperation.DEBIT:
        bankAccount.solde -= newDebit;
        break;
      case this.typeOperation.CREDIT:
        bankAccount.solde += newDebit;
        break;
    }


    await this.updateOne(bankAccount);
  }

  async findOne(id: number): Promise<BankAccount> {
    return this.bankAccountRepository.findOneBy({ id });
  }

  async updateOne(bankAccount: BankAccount): Promise<void> {
    await this.bankAccountRepository.update(bankAccount.id, bankAccount);
  }

  async calc(operation: number, solde: number, type: string): Promise<boolean> {
    let newSolde = solde;
    const newDebit = operation * this.setTax();
    switch (type) {
      case this.typeOperation.DEBIT:
        newSolde -= newDebit;
        break;
      case this.typeOperation.CREDIT:
        newSolde += newDebit;
        break;
    }

    return newSolde >= this.Constants.MIN_ACCOUNT_BALANCE && newSolde <= this.Constants.MAX_ACCOUNT_BALANCE;
  }


    isAccountValid(account: BankAccount): boolean {
        if (account.solde <= this.Constants.MIN_ACCOUNT_BALANCE || account.solde > this.Constants.MAX_ACCOUNT_BALANCE) {
            return false;
        }

        return true;
    }

    getCurrentTime(): string {
        const date = new Date();
        const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return time >= this.Constants.MIN_HOUR_DAY && time <= this.Constants.MAX_HOUR_DAY ? 'day' : 'night';
    }

    setTax(): number {      
        return this.getCurrentTime() === 'day' ? this.Constants.TAX_DAY : this.Constants.TAX_NIGHT;
    }
}

