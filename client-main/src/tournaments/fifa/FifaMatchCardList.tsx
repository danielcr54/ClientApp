import React from 'react';
import { CardListItem } from '../../shared/card';
import { StyledTournamentCardList } from '../tournamentsElements';
import { FifaMatchModel } from '../types';
import { FifaMatchCard } from './FifaMatchCard';

export interface FifaMatchCardListProps {
  isTeamTournament?: boolean;
  matches: FifaMatchModel[];
}

export function FifaMatchCardList({
  matches,
  isTeamTournament
}: FifaMatchCardListProps) {
  return (
    <StyledTournamentCardList>
      {matches.map(match => (
        <CardListItem key={match.id}>
          <FifaMatchCard match={match} isTeamMatch={isTeamTournament} />
        </CardListItem>
      ))}
    </StyledTournamentCardList>
  );
}
