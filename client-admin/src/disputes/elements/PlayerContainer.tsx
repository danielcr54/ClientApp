import React, { Component } from 'react';
import { UserAvatar } from 'shared/UserAvatar';
import styled from '@emotion/styled';
import { UserModel } from 'login/types';

export const PlayerImageContainer = styled('div')(
  ({ small }: PlayerContainerProps) => ({
    display: 'flex',
    alignItems: 'center',
    width: small ? 116 : 165,
    padding: 7,
    backgroundColor: '#28223d',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  })
);

export const PlayerName = styled('div')(
  ({ small }: PlayerContainerProps) => ({
    marginLeft: small ? 5 : 10,
    maxWidth: small ? 53 : 95,
    fontSize: small ? 11 : 16
  })
);

export const ScoreContainer = styled('div')({
  marginLeft: 3,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: 11
});

export interface PlayerContainerProps {
  player: UserModel;
  small?: boolean;
  score?: number;
}

export class PlayerContainer extends Component<PlayerContainerProps> {

  render() {
    const {
      player, small, score
    } = this.props;
    
    return (
      <PlayerImageContainer small={small} player={player}>
        <UserAvatar
          imageUrl={player.profile.avatarUrl}
          size={small ? 18 : 35}
        />
        <PlayerName small={small} player={player}>
          {player.username}
        </PlayerName>

        {score || score === 0 ? (
          <ScoreContainer>
            {score}
          </ScoreContainer>
        ) : ("")}
      </PlayerImageContainer>
    );
  }
}