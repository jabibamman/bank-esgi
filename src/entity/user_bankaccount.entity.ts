import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserBankAccount {
  @PrimaryGeneratedColumn()
  idUser: number;
  @PrimaryGeneratedColumn()
  idBankAccount: number;
}