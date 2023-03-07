import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountService } from 'src/bank-account/bank-account.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private bankAccountService: BankAccountService,
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

  async getAccounts(id: number): Promise<User> {
    // get user with accounts
    return this.bankAccountService.getAccounts(id);
  }

}