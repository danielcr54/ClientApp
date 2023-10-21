import React, { Component } from 'react';
import styled from '@emotion/styled';
import { DisputeTournamentModel } from 'disputes/types';
import { ConsoleBadgeIconsBlock } from 'shared/ConsoleBadgeIconsBlock';

export const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: 45
});

export const Title = styled('div')({
  marginLeft: 10,
  fontSize: 20
});

export interface DisputeCardTitleProps {
  tournament: DisputeTournamentModel;
}

export class DisputeCardTitle extends Component<DisputeCardTitleProps> {

  render() {
    const {
      tournament
    } = this.props;
    
    return (
      <TitleContainer>
        <ConsoleBadgeIconsBlock
          consoleIds={tournament.consoleIds}
        />
        <Title>
          {tournament.title}
        </Title>
      </TitleContainer>
    );
  }
}