import { Module } from '@nestjs/common';
import { AppController } from '../api/app.controller';
import { AppService } from '../service/app.service';
import { UserController } from '../api/user.controller';
import { UserService } from '../service/user.service';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { BankAccount } from '../entity/bankaccount.entity';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountController } from '../api/bank-account.controller';
import { ConstantsService } from 'src/service/constants.service';

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
  providers: [AppService, UserService, BankAccountService, ConstantsService],
})
export class AppModule {}