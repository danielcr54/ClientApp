import React, { Component } from 'react';
import { CardListItem } from '../shared/card';
import { UserModel } from '../core/types';
import { FifaTournamentModel } from './types';
import TournamentCard from './TournamentCard';
import { StyledTournamentCardList } from './tournamentsElements';

export interface TournamentCardListProps {
  tournaments: FifaTournamentModel[];
  currentUser: UserModel;
}

export class TournamentCardList extends Component<TournamentCardListProps> {
  render() {
    const { tournaments, currentUser } = this.props;

    return (
      <StyledTournamentCardList>
        {tournaments.map(tournament => (
          <CardListItem key={tournament.id}>
            <TournamentCard tournament={tournament} currentUser={currentUser} />
          </CardListItem>
        ))}
      </StyledTournamentCardList>
    );
  }
}

export default TournamentCardList;
