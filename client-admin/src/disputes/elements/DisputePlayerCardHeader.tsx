import React, { Component } from 'react';
import styled from '@emotion/styled';
import { UserAvatar } from 'shared/UserAvatar';
import { PlayerContainer } from './PlayerContainer';
import { UserModel } from 'login/types';
import { FifaMatchScoreSubmission, FifaMatchModel } from 'disputes/types';

export const DisputePlayerCardHeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15
});

export const DisputePlayerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const PlayerName = styled('div')({
  marginLeft: 10
});

export const ResultsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const ResultsText = styled('div')({
  fontSize: 9
});

export const ResultsCount = styled('div')({
  marginRight: 5
});

export interface DisputePlayerCardHeaderProps {
  player: UserModel
  scoreSubmission?: FifaMatchScoreSubmission;
  isHomePlayer: boolean;
  fifaMatch: FifaMatchModel;
}

export class DisputePlayerCardHeader extends Component<DisputePlayerCardHeaderProps> {

  render() {
    const {
      player, scoreSubmission, isHomePlayer, fifaMatch
    } = this.props;
    
    return (
      <DisputePlayerCardHeaderContainer>
        <DisputePlayerContainer>
          <UserAvatar
            imageUrl={player.profile.avatarUrl}
            size={35}
          />
          <PlayerName>
            {player.username}
          </PlayerName>
        </DisputePlayerContainer>
        {scoreSubmission && (
          <ResultsContainer>
            <PlayerContainer
              player={fifaMatch.homePlayer}
              small={true}
              score={ isHomePlayer ? scoreSubmission.ownScore : scoreSubmission.opponentScore }
            />
            <PlayerContainer
              player={fifaMatch.awayPlayer}
              small={true}
              score={ isHomePlayer ? scoreSubmission.opponentScore : scoreSubmission.ownScore }
            />
          </ResultsContainer>
        )}
      </DisputePlayerCardHeaderContainer>
    );
  }
}