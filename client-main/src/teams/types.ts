import { UserModel } from '../core/types';

export interface TeamModel {
  id: string;
  name: string;
  urlSlug: string;
  logoUrl?: string;
  countryCode?: string;
  languages?: string[];
  consoleIds?: string[];
  members?: UserModel[];
  owner?: UserModel;
  ownerId?: string;
  inviteRequests?: TeamInviteRequestModel[];
  invites?: TeamInviteModel[];
}

export interface PageInfo {
  page: number;
  pageSize: number;
}

// Invite requests

export enum TeamInviteRequestStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface TeamInviteRequestInputModel {
  teamId: string;
}

export interface TeamInviteRequestModel {
  id: string;
  userId: string;
  user: UserModel;
  teamId: string;
  team: TeamModel;
  status: TeamInviteRequestStatus;
  resolvedAt?: Date;
}

// Invites

export enum TeamInviteStatus {
  PENDING = 'PENDING',
  REVOKED = 'REVOKED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface TeamInviteInputModel {
  userId: string;
  teamId: string;
}

export interface TeamInviteModel {
  id: string;
  userId: string;
  user: UserModel;
  teamId: string;
  team: TeamModel;
  status: TeamInviteStatus;
  resolvedAt?: Date;
}

export interface TronWebModel {
  installed: boolean;
  loggedIn?: boolean;
}
