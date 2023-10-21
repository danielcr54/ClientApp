import React, { Component } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { FifaMatchModel } from '../types';
import { formatDateTimeLabel } from '../tournamentHelpers';
import { FifaMatchTimeScoreLabel } from './FifaMatchTimeScoreLabel';
import { FifaMatchParticipantMediaObject } from './FifaMatchParticipantMediaObject';

const { colors } = styleSettings;

// Fifa match card specific styled components

const FifaMatchCardRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});

const FifaMatchCardLabelBlock = styled('div')({
  position: 'absolute',
  right: 15,
  top: '50%',
  transform: 'translateY(-50%)'
});

// Exported component

export interface FifaMatchCardProps {
  match: FifaMatchModel;
  isTeamMatch?: boolean;
}

export function FifaMatchCard({ match, isTeamMatch }: FifaMatchCardProps) {
  const {
    homePlayer,
    awayPlayer,
    homeTeam,
    awayTeam,
    winner,
    winnerTeam,
    kickoffTime
  } = match;

  return (
    <FifaMatchCardRoot>
      <FifaMatchParticipantMediaObject
        player={homePlayer}
        team={homeTeam}
        isTeam={isTeamMatch}
        isWinner={
          isTeamMatch
            ? homeTeam && homeTeam === winnerTeam
            : homePlayer && homePlayer === winner
        }
      />

      <FifaMatchCardLabelBlock>
        <FifaMatchTimeScoreLabel match={match} />
      </FifaMatchCardLabelBlock>

      <FifaMatchParticipantMediaObject
        player={awayPlayer}
        team={awayTeam}
        isTeam={isTeamMatch}
        isWinner={
          isTeamMatch
            ? awayTeam && awayTeam === winnerTeam
            : awayPlayer && awayPlayer === winner
        }
      />
    </FifaMatchCardRoot>
  );
}
