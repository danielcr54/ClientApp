import { ProfileModel } from '../profile/types';
import { WalletModel } from '../wallet/types';
import {
  TeamModel,
  TeamInviteRequestModel,
  TeamInviteModel
} from '../teams/types';

export interface PageInfo {
  page: number;
  pageSize: number;
}

// tslint:disable-next-line:no-empty-interface
export interface UserStatsModel {
  // TODO
}

export interface UserModel {
  id: string;
  displayName: string;
  legacyId?: number;
  username: string;
  email: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  isKycPassed?: boolean;
  lastLoggedInAt?: Date;
  profile: ProfileModel;
  stats?: UserStatsModel;
  platformWallet?: WalletModel;
  externalWallets?: WalletModel[];
  teamId?: string;
  team?: TeamModel;
  teamRole?: string;
  teamInviteRequests?: TeamInviteRequestModel[];
  teamInvites?: TeamInviteModel[];
  canCreateTeam?: boolean;
  createdAt?: Date;
}

export enum GameMode {
  ULTIMATE_TEAM = 'ULTIMATE_TEAM',
  PRO_CLUBS = 'PRO_CLUBS',
  CLASSIC = 'CLASSIC'
}
