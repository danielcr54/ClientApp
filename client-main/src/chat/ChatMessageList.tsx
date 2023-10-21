import React, { Component, Ref } from 'react';
import styled from '@emotion/styled';
import { styleSettings, LoadingScreen } from '@igg/common';
import { ChatContactModel, ChatConversationModel } from './types';
import { ChatMessageListItem } from './ChatMessageListItem';
import ChatIntroMessage from './ChatIntroMessage';
import ChatConversationQuery from './ChatConversationQuery';
import { ChatLatestMessageMutation, ChatLatestMessageFn } from './ChatMutation';
import { CHAT_CONTACT_QUERY } from './ChatUserQuery';

const { deviceScreenQuery } = styleSettings;

const ChatMessageListRoot = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  maxHeight: '100%',
  padding: '60px 12px 10px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '10px 20px'
  }
});

const ChatMessageListBottom = styled('div')({
  // TO DO
});

export interface ChatMessageListProps {
  conversationMessages?: ChatConversationModel[];
  subscribeToNewMessages: () => void;
  setLatestMessageRead: ChatLatestMessageFn;
  contact: ChatContactModel;
}

export class ChatMessageList extends Component<ChatMessageListProps> {
  messagesEnd: HTMLDivElement;

  componentDidMount() {
    const {
      setLatestMessageRead,
      conversationMessages,
      subscribeToNewMessages
    } = this.props;
    this.scrollToBottom();
    subscribeToNewMessages();
    if (conversationMessages && conversationMessages[0]) {
      const lastMessage = conversationMessages[0];
      setLatestMessageRead({
        variables: {
          conversationId: lastMessage.conversationId,
          messageId: lastMessage.id
        },
        refetchQueries: [{ query: CHAT_CONTACT_QUERY }]
      });
    }
  }

  componentDidUpdate(prevProps: ChatMessageListProps) {
    const { setLatestMessageRead, conversationMessages } = this.props;
    if (
      prevProps.conversationMessages &&
      conversationMessages &&
      prevProps.conversationMessages.length !== conversationMessages.length
    ) {
      this.scrollToBottom();
      if (conversationMessages[0]) {
        const lastMessage = conversationMessages[0];
        setLatestMessageRead({
          variables: {
            conversationId: lastMessage.conversationId,
            messageId: lastMessage.id
          },
          refetchQueries: [{ query: CHAT_CONTACT_QUERY }]
        });
      }
    }
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { conversationMessages, contact } = this.props;
    return (
      <ChatMessageListRoot>
        {(!conversationMessages || conversationMessages.length === 0) && (
          <ChatIntroMessage contact={contact} />
        )}
        {conversationMessages &&
          [...conversationMessages]
            .reverse()
            .map((conversation, index) => (
              <ChatMessageListItem
                key={index}
                conversation={conversation}
                contact={contact}
              />
            ))}
        <ChatMessageListBottom
          ref={el => {
            if (el) {
              this.messagesEnd = el;
            }
          }}
        />
      </ChatMessageListRoot>
    );
  }
}

export interface ChatMessageListConnectedProps {
  contact: ChatContactModel;
  conversationId: string;
}

export default function ChatMessageListConnected({
  contact,
  conversationId
}: ChatMessageListConnectedProps) {
  return (
    <ChatLatestMessageMutation>
      {setLatestMessageRead => (
        <ChatConversationQuery
          renderLoading={() => <LoadingScreen />}
          forceRefetch={true}
          conversationId={conversationId}
        >
          {(conversationMessages, subscribeToNewMessages) => (
            <ChatMessageList
              conversationMessages={conversationMessages}
              subscribeToNewMessages={subscribeToNewMessages}
              setLatestMessageRead={setLatestMessageRead}
              contact={contact}
            />
          )}
        </ChatConversationQuery>
      )}
    </ChatLatestMessageMutation>
  );
}
