import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { ChatSearchInput } from './ChatSearchInput';

const { deviceScreenQuery } = styleSettings;

const ChatSearchRoot = styled('div')({
  padding: '12px 12px',
  
  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '11px 14px'
  }
});

interface ChatSearchProps {
  searchTerm?: string;
  onSearch?: (value?: string) => void;
  inProgress?: boolean;
}

export function ChatSearch({
  searchTerm,
  onSearch,
  inProgress
}: ChatSearchProps) {
  return (
    <ChatSearchRoot>
      <ChatSearchInput
        value={searchTerm}
        onChange={onSearch}
        placeholder="Search users"
        inProgress={inProgress}
      />
    </ChatSearchRoot>
  );
}

export default ChatSearch;
