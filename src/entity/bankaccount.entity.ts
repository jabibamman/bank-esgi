import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solde : number;

  // clé étrangère vers la table User
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;
}