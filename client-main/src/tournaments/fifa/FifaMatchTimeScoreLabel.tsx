import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { FifaMatchModel, FifaMatchStatus } from '../types';
import {
  formatDateTimeLabel,
  isFutureMatch,
  isPastMatch,
  isMatchInProgress
} from '../tournamentHelpers';

const { colors } = styleSettings;

export const StyledFifaMatchTimeScoreLabel = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px 6px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 2,
  fontSize: 13,
  backgroundColor: colors.fadedLighterDark,
  color: 'rgba(255, 255, 255, 0.55)'
});

// Helpers

function renderLabelString(match: FifaMatchModel) {
  if (isFutureMatch(match)) {
    return match.kickoffTime ? formatDateTimeLabel(match.kickoffTime) : 'TBC';
  }

  if (match.status === FifaMatchStatus.CANCELLED) {
    return 'Cancelled';
  }

  if (match.status === FifaMatchStatus.DID_NOT_FINISH) {
    return 'DNF';
  }

  if (match.status === FifaMatchStatus.DISPUTE) {
    return 'Dispute';
  }

  if (
    isPastMatch(match) ||
    match.status === FifaMatchStatus.COMPLETED ||
    match.status === FifaMatchStatus.VERIFIED
  ) {
    return `${match.homeScore || 0} - ${match.awayScore || 0}`;
  }

  if (
    isMatchInProgress(match) ||
    match.status === FifaMatchStatus.PRE_GAME ||
    match.status === FifaMatchStatus.IN_GAME
  ) {
    return 'In Progress';
  }

  return 'N/A';
}

// Main component

export interface FifaMatchTimeScoreLabelProps {
  match: FifaMatchModel;
}

export function FifaMatchTimeScoreLabel({
  match
}: FifaMatchTimeScoreLabelProps) {
  return (
    <StyledFifaMatchTimeScoreLabel>
      {renderLabelString(match)}
    </StyledFifaMatchTimeScoreLabel>
  );
}
