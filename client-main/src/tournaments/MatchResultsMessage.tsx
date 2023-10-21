import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors, deviceScreenQuery } = styleSettings;

// Styled helpers

const MatchResultMessageRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '20px 20px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: 50
  }
});

const MatchResultMessageIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  fontSize: 18,
  lineHeight: 1.5,
  borderRadius: '50%',
  textAlign: 'center',
  backgroundColor: colors.main,
  color: colors.white,
  overflow: 'hidden',

  '&:not(:last-of-type)': {
    marginBottom: 30
  }
});

const MatchResultMessageText = styled('div')({
  fontSize: 18,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.80)',
  textAlign: 'center'
});

// Exported component

export interface MatchResultMessageProps {
  icon?: ReactNode;
  text: string;
}

export function MatchResultMessage({
  icon,
  text
}: MatchResultMessageProps) {
  return (
    <MatchResultMessageRoot>
      {icon && <MatchResultMessageIcon>{icon}</MatchResultMessageIcon>}
      <MatchResultMessageText>{text}</MatchResultMessageText>
    </MatchResultMessageRoot>
  );
}

export default MatchResultMessage;
