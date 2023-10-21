import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { Card, CardContent, CardContentCell } from './card';

const { deviceScreenQuery, colors } = styleSettings;

// TODO: Consider combining this component with ActionBlock somehow

const MessageCardRoot = styled(Card)({
  marginBottom: 22
});

const MessageCardContent = styled(CardContent)({
  padding: 15,

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '20px 24px'
  }
});

export const MessageCardTitle = styled('div')({
  marginBottom: 12,
  fontSize: 20,
  fontWeight: 500,
  color: colors.white,

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 22
  }
});

export const MessageCardText = styled('div')({
  flex: 1,
  marginBottom: 15,
  fontSize: 13,
  lineHeight: 1.4,
  color: 'rgba(255, 255, 255, 0.55)'
});

export const MessageCardActions = styled('div')({
  // ?
});

export interface MessageCardProps {
  children?: ReactNode;
}

export function MessageCard({ children }: MessageCardProps) {
  return (
    <MessageCardRoot faded={true}>
      <MessageCardContent>
        <CardContentCell main={true} forceAlignStart={true}>
          {children}
        </CardContentCell>
      </MessageCardContent>
    </MessageCardRoot>
  );
}
