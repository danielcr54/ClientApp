import { UserModel } from "login/types";

export interface FifaDisputeModel {
  id: string;
  match?: FifaMatchModel;
  reason: FifaMatchDisputeReason;
  comment?: string;
  createdBy?: UserModel;
  player?: UserModel;
  team?: TeamModel;
}

export interface TeamModel {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface DisputeTournamentModel {
  consoleIds: string[];
  title: string;
  gameMode: GameMode;
}

export interface IssuedActionModel {
  id: string;
  title: string
  issueDate: Date;
}

export interface DisputeActionModel {
  id: string;
  title: string;
  isEnforcementAction: boolean;
  isInActive?: boolean;
  matchId?: string;
  actionType: FifaMatchDisputeActionType;
}

export interface FifaMatchDisputeAction {
  match: FifaMatchModel;
  player?: UserModel;
  team?: TeamModel;
  type: FifaMatchDisputeActionType;
}

export interface FifaTournamentRoundModel {
  type: TournamentRoundType;
}

export interface FifaMatchModel {
  id: string;
  tournament: DisputeTournamentModel
  round: FifaTournamentRoundModel;
  homePlayer: UserModel;
  awayPlayer: UserModel;
  // add teams
  homeStreamUrl?: string;
  awayStreamUrl?: string;
  homeScoreSubmission?: FifaMatchScoreSubmission
  awayScoreSubmission?: FifaMatchScoreSubmission
  disputes?: FifaDisputeModel[];
  disputeClaimedBy?: UserModel;
  disputeResolutionNote?: string;
  disputeResolvedAt?: Date;
  disputeActions?: FifaMatchDisputeAction[];
}

export interface FifaMatchScoreSubmission {
  ownScore: number;
  opponentScore: number;
  screenshotUrls?: string[];
}

export interface FifaMatchDisputeReasonProperty {
  reason: FifaMatchDisputeReason;
  displayName: string;
}

export enum GameMode {
  ULTIMATE_TEAM = 'ULTIMATE_TEAM',
  PRO_CLUBS = 'PRO_CLUBS'
}

export enum TournamentRoundType {
  REGULAR = 'REGULAR',
  QUARTER_FINAL = 'QUARTER_FINAL',
  SEMI_FINAL = 'SEMI_FINAL',
  FINAL = 'FINAL',
  LOSERS = 'LOSERS'
}

export enum FifaMatchDisputeReason {
  GUEST_ADDED = 'GUEST_ADDED',
  CUSTOM_TEAM = 'CUSTOM_TEAM',
  CANT_FIND_GAMERTAG = 'CANT_FIND_GAMERTAG',
  INCORRECT_GAMERTAG = 'INCORRECT_GAMERTAG',
  UNRESPONSIVE_OPPONENT = 'UNRESPONSIVE_OPPONENT',
  DISCONNECTED_MATCH = 'DISCONNECTED_MATCH',
  OPPONENT_DIDNT_REMATCH = 'OPPONENT_DIDNT_REMATCH',
  INCORRECT_GAMEMODE = 'INCORRECT_GAMEMODE',
  INCONSISTENT_SCORE = 'INCONSISTENT_SCORE',
  NO_SCORE_SUBMITTED = 'NO_SCORE_SUBMITTED'
}

export enum FifaMatchDisputeActionType {
  YELLOW_CARD = 'YELLOW_CARD',
  RED_CARD = 'RED_CARD',
  DISQUALIFY_PLAYER = 'DISQUALIFY_PLAYER',
  QUALIFY_PLAYER = 'QUALIFY_PLAYER'
}
