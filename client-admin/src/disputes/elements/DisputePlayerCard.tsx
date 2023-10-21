import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FifaMatchModel } from 'disputes/types';
import { DisputePlayerCardHeader } from './DisputePlayerCardHeader';
import { DisputePlayerCardMatchData } from './DisputePlayerCardMatchData';
import { DisputePlayerCardDispute } from './DisputePlayerCardDispute';
import { DisputePlayerCardIssueActions } from './DisputePlayerCardIssueActions';
import ResolveDisputeStateContainer from 'disputes/states/ResolveDisputesStateContainer';
import { UserModel } from 'login/types';

export const DisputePlayerCardContainer = styled('div')({
  width: '45%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#28223d',
  padding: 16,
  border: '1px solid rgba(255, 255, 255, 0.1)'
});

export interface DisputePlayerCardProps {
  player: UserModel;
  resolveDisputeStateContainer: ResolveDisputeStateContainer;
  isHomePlayer: boolean;
  fifaMatch: FifaMatchModel;
}

export class DisputePlayerCard extends Component<DisputePlayerCardProps> {

  render() {
    const {
      player, resolveDisputeStateContainer, isHomePlayer, fifaMatch
    } = this.props;
    
    return (
      <DisputePlayerCardContainer>
        <DisputePlayerCardHeader
          player={player}
          scoreSubmission={ isHomePlayer ? fifaMatch.homeScoreSubmission : fifaMatch.awayScoreSubmission }
          isHomePlayer={isHomePlayer}
          fifaMatch={fifaMatch}
        />
        <DisputePlayerCardMatchData
          streamingLink={ isHomePlayer ? fifaMatch.homeStreamUrl : fifaMatch.awayStreamUrl }
        />
        <DisputePlayerCardDispute
          fifaMatch={fifaMatch}
          scoreSubmission={ isHomePlayer ? fifaMatch.homeScoreSubmission : fifaMatch.awayScoreSubmission }
          playerId={player.id}
        />

        <DisputePlayerCardIssueActions
          resolveDisputeStateContainer={resolveDisputeStateContainer}
          isHomePlayer={isHomePlayer}
          matchId={fifaMatch.id}
        />
      </DisputePlayerCardContainer>
    );
  }
}