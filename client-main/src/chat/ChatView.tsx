import React, { Component } from 'react';
import Media from 'react-media';
import { styleSettings } from '@igg/common';
import { ChatLayout } from './ChatLayout';
import ChatMainPane from './ChatMainPaneConnected';
import ChatConversationPane from './ChatConversationPane';
import ChatViewContext from './ChatViewContext';

const { deviceScreenQuery } = styleSettings;

export function ChatView() {
  return (
    <ChatLayout>
      <Media query={deviceScreenQuery.medium}>
        {largeScreen => (
          <ChatViewContext.Consumer>
            {({ currentContact, open, close, currentUser }) => (
              <>
                {(largeScreen ||
                  !currentContact.user ||
                  !currentContact.user.id) && (
                  <ChatMainPane onContactClick={open} />
                )}
                {currentContact.user && currentContact.user.id && (
                  <ChatConversationPane
                    contact={currentContact}
                    onCloseClick={close}
                  />
                )}
              </>
            )}
          </ChatViewContext.Consumer>
        )}
      </Media>
    </ChatLayout>
  );
}

export default ChatView;
