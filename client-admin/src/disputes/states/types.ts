import { DisputeActionModel } from "disputes/types";

export interface ResolveDisputeState {
  homeActions?: DisputeActionModel[];
  awayActions?: DisputeActionModel[];
}

export interface ResolveDisputeFormModel {
  matchId: string;
  disputeResolutionNote: string;
  homeScore: number;
  awayScore: number;
  homeActions?: DisputeActionModel[];
  awayActions?: DisputeActionModel[];
}