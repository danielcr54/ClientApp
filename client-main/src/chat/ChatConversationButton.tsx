import React from 'react';
import { Button } from '@igg/common';
import ChatViewContext from './ChatViewContext';
import { ChatContactModel } from './types';

export interface ChatConversationButtonProps {
  small?: boolean;
  contact: ChatContactModel;
}

export function ChatConversationButton({
  contact,
  small
}: ChatConversationButtonProps) {
  return (
    <ChatViewContext.Consumer>
      {({ open, currentUser }) => {
        if (currentUser && currentUser.id === contact.user.id) {
          return null;
        }
        return (
          <Button inverse={true} small={small} onClick={() => open(contact)}>
            Chat
          </Button>
        )
      }}
    </ChatViewContext.Consumer>
  );
}

export default ChatConversationButton;
