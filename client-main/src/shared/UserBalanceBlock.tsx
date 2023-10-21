import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

// Styled helpers

const UserBalanceRoot = styled('div')({
  display: 'flex',
  width: '100%',
  padding: '10px 12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 2,
  backgroundColor: colors.fadedLighterDark,
  color: colors.white,
  fontSize: 13,

  [`@media ${deviceScreenQuery.medium}`]: {}
});

export const UserBalanceFigure = styled('div')({
  marginRight: 12,
  padding: 3
});

// TEMP. TODO: Reuse the generic one once implemented
export const UserBalanceIcon = styled('div')({
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: '#ffc200',
  overflow: 'hidden'
});

export const UserBalanceBody = styled('div')({
  flex: 1
});

export const UserBalanceText = styled('div')({
  paddingTop: 3,
  paddingBottom: 3,
  fontSize: 15,
  lineHeight: 1.4,
  color: 'white',

  '& strong': {
    fontWeight: 500
  }
});

export interface UserBalanceBlockProps {
  amount?: number;
  currency?: string;
}

export function UserBalanceBlock({ amount, currency }: UserBalanceBlockProps) {
  return (
    <UserBalanceRoot>
      <UserBalanceFigure>
        <UserBalanceIcon />
      </UserBalanceFigure>

      <UserBalanceBody>
        <UserBalanceText>
          Your current balance is{' '}
          <strong>
            {amount} {currency || 'IGG'}
          </strong>
        </UserBalanceText>
      </UserBalanceBody>
    </UserBalanceRoot>
  );
}

export default UserBalanceBlock;
