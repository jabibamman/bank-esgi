import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../entity/bankaccount.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  async credit(id: number, credit: number) {
    const bankAccount = await this.findOne(id);
    console.log(bankAccount);
    if (await this.calc(credit, bankAccount.solde, 'credit')) {
      await this.action(credit, bankAccount, 'credit');
    }
    console.log(bankAccount);
    return { credit: credit, solde: bankAccount.solde };
  }

  async debit(id: number, debit: number) {
    const bankAccount = await this.findOne(id);
    console.log(bankAccount);
    if (await this.calc(debit, bankAccount.solde, 'debit')) {
      await this.action(debit, bankAccount, 'debit');
    }
    console.log(bankAccount);
    return { debit: debit, solde: bankAccount.solde };
  }

  async action(
    debit: number,
    bankAccount: BankAccount,
    type: string,
  ): Promise<void> {
    const newDebit = debit * 1.02;

    if (type === 'debit') {
      bankAccount.solde -= newDebit;
    } else if (type === 'credit') {
      bankAccount.solde += newDebit;
    }

    await this.updateOne(bankAccount);
  }

  async findOne(id: number): Promise<BankAccount> {
    return this.bankAccountRepository.findOneBy({ id });
  }

  async updateOne(bankAccount: BankAccount): Promise<void> {
    await this.bankAccountRepository.update(bankAccount.id, bankAccount);
  }

  async calc(debit: number, solde: number, type: string): Promise<boolean> {
    let newSolde = solde;
    const newDebit = debit * 1.02;

    if (type === 'debit') {
      newSolde -= newDebit;
    } else if (type === 'credit') {
      newSolde += newDebit;
    }

    return newSolde >= 0 && newSolde <= 1000;
  }
}
