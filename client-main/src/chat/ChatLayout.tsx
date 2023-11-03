import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery } = styleSettings;

// Visual helpers (should go to common under a different name)

const ChatLayoutRoot = styled('div')({
  position: 'fixed',
  zIndex: 98,
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  pointerEvents: 'none',
  
  [`@media ${deviceScreenQuery.medium}`]: {
    left: 'auto'
  }
});

const ChatLayoutContainer = styled('div')({
  marginTop: 59,
  width: '100%',
  height: '100%',
  right: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  pointerEvents: 'auto',
  
  [`@media ${deviceScreenQuery.medium}`]: {
    width: 'auto',
    marginTop: 60,
  }
});

const ChatLayoutBackdrop = styled('div')({
  // TODO
});

// Exported component

export interface ChatLayoutProps {
  children?: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <ChatLayoutRoot>
      <ChatLayoutContainer>{children}</ChatLayoutContainer>
    </ChatLayoutRoot>
  );
}

export default ChatLayout;
