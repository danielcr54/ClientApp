import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface TabsStyledProps {
  stretch?: boolean;
}

export const TabsRoot = styled('nav')({
  display: 'flex',
  alignItems: 'stretch',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  // whiteSpace: 'nowrap',

  '&::-webkit-scrollbar': {
    width: 0,
    height: 0
  }
});

export const TabsContainer = styled('div')(({ stretch }: TabsStyledProps) => ({
  flexGrow: 1,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: stretch ? 'stretch' : 'flex-start',
  borderStyle: 'solid',
  borderWidth: 0,
  borderBottomWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',

  '& > *': {
    flexGrow: stretch ? 1 : 0
  }
}));

export interface TabsProps extends TabsStyledProps {
  children?: ReactNode;
}

export function Tabs({ children, ...styledProps }: TabsProps) {
  return (
    <TabsRoot {...styledProps}>
      <TabsContainer>{children}</TabsContainer>
    </TabsRoot>
  );
}

export default Tabs;
