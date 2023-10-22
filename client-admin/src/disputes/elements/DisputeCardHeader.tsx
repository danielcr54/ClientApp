import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FifaMatchModel } from 'disputes/types';
import { DisputeCardTitle } from './DisputeCardTitle';
import { DisputeCardSubTitle } from './DisputeCardSubTitle';

export const DisputeCardHeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10,
  paddingBottom: 10,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
});

export const DisputeCardHeaderTitlePlayerContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const DisputeCardHeaderPlayerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
});

export interface DisputeCardHeaderProps {
  fifaMatch: FifaMatchModel;
}

export class DisputeCardHeader extends Component<DisputeCardHeaderProps> {

  render() {
    const {
      fifaMatch
    } = this.props;
    
    return (
      <DisputeCardHeaderContainer>
        <DisputeCardHeaderTitlePlayerContainer>
          <DisputeCardTitle
            tournament={fifaMatch.tournament}
          />
          <DisputeCardHeaderPlayerContainer>
            <DisputeCardSubTitle
              fifaMatch={fifaMatch}
            />
          </DisputeCardHeaderPlayerContainer>
        </DisputeCardHeaderTitlePlayerContainer>
      </DisputeCardHeaderContainer>
    );
  }
}