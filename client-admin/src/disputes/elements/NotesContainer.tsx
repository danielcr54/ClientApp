import React, { Component } from 'react';
import styled from '@emotion/styled';

export const NotesTextContainer = styled('div')({
  borderRadius: 3,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: 15,
  marginBottom: 10,
  color: 'rgba(255, 255, 255, 0.5)',
  backgroundColor: '#28223d'
});

export interface NotesContainerProps {
  text: string;
}

export class NotesContainer extends Component<NotesContainerProps> {

  render() {
    const {
      text
    } = this.props;
    
    return (
      <NotesTextContainer>
        {text}
      </NotesTextContainer>
    );
  }
}