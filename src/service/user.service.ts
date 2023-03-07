import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/entity/bankaccount.entity';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ConstantsService } from './constants.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private Constants: ConstantsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    await this.usersRepository.delete(id);
  }

  async getUserName(id: number): Promise<string> {
    const user = await this.findOneUser(id);
    return user.name;
  }

  async hasTooManyAccounts(accounts : BankAccount[]): Promise<boolean> {
    if (accounts.length >= this.Constants.MAX_ACCOUNTS_PER_USER) {
      return true;
    }
    return false;
  }

}