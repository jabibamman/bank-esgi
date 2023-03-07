import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { BankAccount } from './entity/bankaccount.entity';
import { BankAccountService } from './bank-account/bank-account.service';
import { BankAccountController } from './bank-account/bank-account.controller';

const envDir = '.env';
const dotenv = require('dotenv');
dotenv.config({ path: envDir });

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPWD,
      database: process.env.PGDB,
      entities: [User, BankAccount],
      synchronize: true,
      logging: false, // affiche les requêtes SQL dans la console
    }),
  ],
  controllers: [AppController, UserController, BankAccountController],
  providers: [AppService, UserService, BankAccountService],
})
export class AppModule {}