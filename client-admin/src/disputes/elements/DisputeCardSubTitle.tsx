import React, { Component } from 'react';
import styled from '@emotion/styled';
import { GameMode, TournamentRoundType, FifaMatchModel } from 'disputes/types';

export const SubTitleContainer = styled('div')({
  paddingLeft: 41,
  fontSize: 12,
  display: 'flex'
});

export const Seperator = styled('div')({
  padding: '0px 10px',
  color: 'rgba(255, 255, 255, 0.1)'
});

export interface DisputeCardSubTitleProps {
  fifaMatch: FifaMatchModel;
}

const gameModeLabels = {
  [GameMode.ULTIMATE_TEAM]: 'Ultimate Team',
  [GameMode.PRO_CLUBS]: 'Pro Clubs'
};

export function gameModeLabel(gameMode: GameMode) {
  return gameModeLabels[gameMode] || 'Unknown';
}

const roundLabels = {
  [TournamentRoundType.REGULAR]: 'Regular',
  [TournamentRoundType.QUARTER_FINAL]: 'Quarter Final',
  [TournamentRoundType.SEMI_FINAL]: 'Semi Final',
  [TournamentRoundType.FINAL]: 'Final',
  [TournamentRoundType.LOSERS]: 'Losers',
};

export function roundLabel(roundType: TournamentRoundType) {
  return roundLabels[roundType] || 'Unknown';
}

export class DisputeCardSubTitle extends Component<DisputeCardSubTitleProps> {

  render() {
    const {
      fifaMatch
    } = this.props;
    
    return (
      <SubTitleContainer>
        {gameModeLabel(fifaMatch.tournament.gameMode)}
        <Seperator>
          |
        </Seperator>
        {roundLabel(fifaMatch.round.type)}
      </SubTitleContainer>
    );
  }
}