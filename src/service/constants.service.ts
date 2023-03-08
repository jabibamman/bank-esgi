import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstantsService {
  public readonly MAX_ACCOUNTS_PER_USER = 5;
  public readonly MAX_ACCOUNT_BALANCE = 1000;
  public readonly MIN_ACCOUNT_BALANCE = 0;
  public readonly TAX_DAY = 1.02;
  public readonly TAX_NIGHT = 1.01;
  public readonly MIN_HOUR_DAY = '07:00:00';
  public readonly MAX_HOUR_DAY = '21:00:00';
}
