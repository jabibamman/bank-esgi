import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountModule } from './bank-account/bank-account.module';
import { BankAccountController } from './bank-account/bank-account.controller';
import { BankAccountService } from './bank-account/bank-account.service';
import { BankAccount } from './entity/bankaccount.entity';
import { User } from './entity/user.entity';

const envDir = '.env';
const dotenv = require('dotenv');
dotenv.config({ path: envDir });

@Module({
  imports: [
    UserModule,
    BankAccountModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPWD,
      database: process.env.PGDB,
      entities: [User, BankAccount],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UserController, BankAccountController],
  providers: [AppService, UserService, BankAccountService],
})
export class AppModule {}
