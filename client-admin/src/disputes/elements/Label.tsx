import React, { Component } from 'react';
import styled from '@emotion/styled';

export const LabelContainer = styled('div')({
  width: '100%',
  fontSize: 9,
  fontWeight: 300,
  marginBottom: 5
});

export interface LabelProps {
  text: string;
}

export class Label extends Component<LabelProps> {

  render() {
    const {
      text
    } = this.props;
    
    return (
      <LabelContainer>
        { text }
      </LabelContainer>
    );
  }
}