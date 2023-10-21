import React from 'react';
import styled from '@emotion/styled';

export interface PrimaryNavProps {
  stacked?: boolean;
}

export const PrimaryNav = styled('nav')(({ stacked }: PrimaryNavProps) => ({
  display: 'flex',
  flexDirection: stacked ? 'column' : 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start'
}));

PrimaryNav.displayName = 'PrimaryNav';

export default PrimaryNav;
