import { UserModel } from '../core/types';

export interface WalletModel {
  address: string;
  salt: string;
  transactions: WalletTransactionModel[];
  balances: WalletBalanceModel[];
}

export enum ExternalWalletStatus {
  'VALIDATED',
  'UNVALIDATED'
}

export enum WalletTransactionStatus {
  'CONFIRMED',
  'UNCONFIRMED'
}

export interface PlatformWalletModel extends WalletModel {
  user: UserModel;
}

export interface ExternalWalletModel extends WalletModel {
  name: string;
  status: ExternalWalletStatus;
  validationAmountA: number;
  validationAmountB: number;
  validatedAt: Date;
  user: UserModel;
}

export interface WalletTransactionModel {
  id: string;
  hash: string;
  amount: number;
  timestamp: number; // Timestamp
  token: TronTokenModel;
  status: WalletTransactionStatus;
  fromAddress: string;
  toAddress: string;
}

export interface WalletBalanceModel {
  id: string;
  amount: number;
  token: TronTokenModel;
}

export interface TronTokenModel {
  name: string;
  abbreviation: string;
  description: string;
}
