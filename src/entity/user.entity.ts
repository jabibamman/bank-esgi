import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BankAccount } from './bankaccount.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => BankAccount, bankAccount => bankAccount.user)
  bankAccounts: BankAccount[];
}