import { UserModel, GameMode } from '../core/types';
import { TeamModel } from '../teams/types';

export enum FifaTournamentType {
  BRACKET = 'BRACKET'
}

export enum TournamentGroupSize {
  EIGHT_MAX = 'EIGHT_MAX'
}

export enum TournamentRoundType {
  REGULAR = 'REGULAR',
  QUARTER_FINAL = 'QUARTER_FINAL',
  SEMI_FINAL = 'SEMI_FINAL',
  FINAL = 'FINAL',
  LOSERS = 'LOSERS'
}

export enum TournamentPrizeType {
  TOKEN = 'TOKEN',
  CASH = 'CASH',
  PHYSICAL = 'PHYSICAL'
}

export enum FifaMatchLength {
  SHORT = 'SHORT',
  NORMAL = 'NORMAL',
  LONG = 'LONG'
}

export enum FifaTournamentStatus {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum FifaMatchStatus {
  PENDING = 'PENDING',
  PRE_GAME = 'PRE_GAME',
  IN_GAME = 'IN_GAME',
  DISPUTE = 'DISPUTE',
  COMPLETED = 'COMPLETED',
  VERIFIED = 'VERIFIED',
  CANCELLED = 'CANCELLED',
  DID_NOT_FINISH = 'DID_NOT_FINISH'
}

export enum FifaMatchParticipantStatus {
  PENDING = 'PENDING',
  READY = 'READY',
  DISQUALIFIED = 'DISQUALIFIED',
  FORFEITED = 'FORFEITED',
  WINNER = 'WINNER',
  LOSER = 'LOSER'
}

export enum FifaMatchForfeitReason {
  LATE = 'LATE',
  NO_SCORE_SUBMITTED = 'NO_SCORE_SUBMITTED',
  USER_INITIATED = 'USER_INITIATED',
  ADMIN_INITIATED = 'ADMIN_INITIATED'
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

export interface FifaTournamentModel {
  id: string;
  title: string;
  urlSlug: string;
  gameMode: GameMode;
  type: FifaTournamentType;
  consoleIds: string[];
  owner?: UserModel;
  players: UserModel[];
  teams: TeamModel[];
  rounds: FifaTournamentRoundModel[];
  groups?: FifaTournamentGroupModel[];
  matches?: FifaMatchModel[];
  winner?: UserModel;
  winnerTeam?: TeamModel;
  startTime?: Date;
  endTime?: Date;
  prizes: TournamentPrizeModel[];
  maxPlayers: number;
  teamSize?: number;
  groupSize?: TournamentGroupSize;
  matchLength?: FifaMatchLength;
  status: FifaTournamentStatus;
}

export interface FifaTournamentRoundModel {
  id: string;
  type?: TournamentRoundType;
  order?: number;
  matches?: FifaMatchModel[];
  timeSlots: FifaRoundTimeSlotModel[];
  prizes: TournamentPrizeModel[];
  startTime?: Date;
  endTime?: Date;
}

export interface FifaRoundTimeSlotModel {
  id: string;
  startTime: Date;
  endTime: Date;
}

export interface FifaMatchTimeSlotModel {
  id: string;
  startTime: Date;
  endTime: Date;
}

export interface FifaTournamentGroupModel {
  id: string;
  order: number;
  matches?: FifaMatchModel[];
  players: UserModel[];
  teams: TeamModel[];
}

export interface FifaMatchScoreSubmissionModel {
  ownScore: number;
  opponentScore: number;
  screenshotUrls?: string[];
  submittedAt: Date;
}

export interface FifaMatchForfeitModel {
  reason: FifaMatchForfeitReason;
  comment?: string;
  forfeitedAt: Date;
}

export interface FifaMatchModel {
  id: string;
  group?: FifaTournamentGroupModel;
  groupId?: string;
  round?: FifaTournamentRoundModel;
  roundId: string;
  kickoffTime?: Date;
  finishTime?: Date;
  nextMatchId?: string;
  homePlayer?: UserModel;
  homePlayerId?: string;
  awayPlayer?: UserModel;
  awayPlayerId?: string;
  homeTeam?: TeamModel;
  homeTeamId?: string;
  awayTeam?: TeamModel;
  awayTeamId?: string;
  winner?: UserModel;
  winnerId?: string;
  winnerTeam?: TeamModel;
  winnerTeamId?: string;
  homeTimeSlotIds?: string[];
  homeTimeSlots?: FifaMatchTimeSlotModel[];
  awayTimeSlotIds?: string[];
  awayTimeSlots?: FifaMatchTimeSlotModel[];
  homeStreamUrl?: string;
  awayStreamUrl?: string;
  homeScoreSubmission?: FifaMatchScoreSubmissionModel;
  awayScoreSubmission?: FifaMatchScoreSubmissionModel;
  homeScore?: number;
  awayScore?: number;
  homeReadyAt?: Date;
  awayReadyAt?: Date;
  homeDisqualifiedAt?: Date;
  awayDisqualifiedAt?: Date;
  homeForfeit?: FifaMatchForfeitModel;
  awayForfeit?: FifaMatchForfeitModel;
  homeStatus: FifaMatchParticipantStatus;
  awayStatus: FifaMatchParticipantStatus;
  status: FifaMatchStatus;
}

export interface TournamentPrizeModel {
  id: string;
  name: string;
  type: TournamentPrizeType;
  place?: number;
}

// Use-case specific models

export interface JoinFifaTournamentFormModel {
  tournamentId: string;
  firstMatchTimeSlotIds: string[];
}

export interface FifaRoundTimeSlotFormModel {
  tournamentId: string;
  roundTimeSlotIds: string[];
}

export interface SetFifaMatchTimeSlotsModel {
  matchId: string;
  playerId?: string;
  teamId?: string;
  timeSlotIds: string[];
}

export interface MarkAsReadyForFifaMatchModel {
  matchId: string;
  playerId?: string;
  teamId?: string;
  streamUrl?: string;
}

export interface ForfeitFifaMatchModel {
  matchId: string;
  playerId?: string;
  teamId?: string;
  reason: FifaMatchForfeitReason;
  comment?: string;
}

export interface SubmitFifaMatchResultModel {
  matchId: string;
  playerId?: string;
  teamId?: string;
  ownScore?: number;
  opponentScore?: number;
  screenshotUrls?: string[];
  videoUrl?: string;
  disputeReason?: FifaMatchDisputeReason;
  disputeComment?: string;
}
