import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { HexagonBadge } from '../shared/HexagonBadge';

const { colors } = styleSettings;

// Styled helpers

const ChatNavPlaceholderRoot = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 15,
  textAlign: 'center'
});

const ChatNavPlaceholderFigure = styled('div')({
  marginBottom: 15
});

const ChatNavPlaceholderMessage = styled('div')({
  marginBottom: 5,
  fontSize: 15,
  lineHeight: 1.4,
  color: colors.white
});

const ChatNavPlaceholderNote = styled('div')({
  fontSize: 13,
  lineHeight: 1.4,
  color: 'rgba(255, 255, 255, 0.55)'
});

// Exported component

interface ChatNavPlaceholderProps {
  message: string;
  note?: string;
}

export function ChatNavPlaceholder({ message, note }: ChatNavPlaceholderProps) {
  return (
    <ChatNavPlaceholderRoot>
      <ChatNavPlaceholderFigure>
        <HexagonBadge size={35} />
      </ChatNavPlaceholderFigure>
      <ChatNavPlaceholderMessage>{message}</ChatNavPlaceholderMessage>
      {note && <ChatNavPlaceholderNote>{note}</ChatNavPlaceholderNote>}
    </ChatNavPlaceholderRoot>
  );
}

export default ChatNavPlaceholder;
