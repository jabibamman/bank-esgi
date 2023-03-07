import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstantsService {
  public readonly MAX_ACCOUNTS_PER_USER = 5;
  public readonly MAX_ACCOUNT_BALANCE = 1000;
  public readonly MIN_ACCOUNT_BALANCE = 0;
}
