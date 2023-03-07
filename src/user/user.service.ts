import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: number): Promise<User> {
    console.log("ici", this.usersRepository.findOneBy({ id }));

    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    await this.usersRepository.delete(id);
  }

  async getUserName(id: number): Promise<User> {
    console.log('getUserName');
    return this.findOneUser(id);
  }

  async getAccounts(id: number): Promise<User> {
    console.log('getAccounts');
    return this.findOneUser(id); 
  }

}