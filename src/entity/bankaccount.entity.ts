import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('bankaccount')
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  solde : number;

  // clé étrangère vers la table User
  @ManyToOne(type => User, user => user.bankAccounts)
  user: User;

  @Column({ nullable: true })
  userId: number;
}
