import React, { Component } from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import { IoIosArrowBack } from 'react-icons/io';
import { CloseModalButton, LoadingScreen, styleSettings } from '@igg/common';
import {
  resolveGraphQLSubmitErrors,
  getErrorMessage
} from '../shared/errorHelpers';
import { ChatContactModel } from './types';
import ChatMessageForm from './ChatMessageForm';
import ChatUserMediaObject from './ChatUserMediaObject';
import ChatMessageList from './ChatMessageList';
import { ChatInitMutation, ChatInitFn } from './ChatMutation';
import { CHAT_CONTACT_QUERY } from './ChatUserQuery';

const { deviceScreenQuery, colors } = styleSettings;

// Styled helpers

const ChatConversationWrap = styled('div')({
  flex: 1,
  flexShrink: 0,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  width: '100%',
  fontSize: 13,
  backgroundColor: colors.dark,
  color: 'rgba(35, 31, 50, 0.7)',
  overflow: 'hidden',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexBasis: 495,
    width: 495,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0
  }
});

const ChatConversationPaneRoot = styled('div')({
  position: 'relative',
  height: '100%',
  paddingBottom: 66
});

interface ChatConversationPaneHeaderProps {
  alignEnd?: boolean;
}

const ChatConversationPaneHeader = styled('header')(
  ({ alignEnd }: ChatConversationPaneHeaderProps) => ({
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: alignEnd ? 'flex-end' : 'flex-start',
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 10,
    padding: '10px 12px',
    borderBottom: `1px solid ${colors.fadedLighterDark}`,
    backgroundColor: colors.dark,

    [`@media ${deviceScreenQuery.medium}`]: {
      marginBottom: 0,
      padding: '20px 20px 15px',
      borderBottom: 'none',
      backgroundColor: 'transparent'
    }
  })
);

const ChatConversationCloseButton = styled(CloseModalButton)({
  opacity: 0.3,

  [`&:hover`]: {
    opacity: 1
  }
});

const ChatConversationPaneMain = styled('div')({
  position: 'relative',
  flex: 1,
  padding: '60px 12px 10px',
  height: '100%',
  overflowY: 'auto',

  [`&::-webkit-scrollbar`]: {
    width: '5px'
  },

  [`&::-webkit-scrollbar-track`]: {
    backgroundColor: colors.dark
  },

  [`&::-webkit-scrollbar-thumb`]: {
    backgroundColor: colors.lighterDark,
    borderRadius: 4
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '10px 20px'
  }
});

const ChatConversationPaneActions = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: 0,

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '15px 20px 15px'
  }
});

// TODO: Generalize to a "BackNavButton" or alike and extract to `common`
const ChatConversationPaneBackButton = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -12,
  padding: '10px 12px',
  fontSize: 18,
  color: colors.dark,
  opacity: 0.7,

  '&:hover, &:active': {
    color: colors.main
  }
});

// Exported component

export interface ChatConversationPaneProps {
  currentChatUser?: ChatContactModel;
  contact: ChatContactModel;
  conversationId: string;
  onCloseClick?: () => void;
  readonly?: boolean;
}

export function ChatConversationPane({
  currentChatUser,
  contact,
  conversationId,
  onCloseClick
}: ChatConversationPaneProps) {
  return (
    <ChatConversationPaneRoot>
      <Media query={deviceScreenQuery.medium}>
        {largeScreen => (
          <ChatConversationPaneHeader alignEnd={largeScreen}>
            {!largeScreen && (
              <>
                <ChatConversationPaneBackButton onClick={onCloseClick}>
                  <IoIosArrowBack color={colors.white} />
                </ChatConversationPaneBackButton>

                <ChatUserMediaObject contact={contact} inverseContext={true} />
              </>
            )}

            {largeScreen && (
              <ChatConversationCloseButton onClick={onCloseClick} />
            )}
          </ChatConversationPaneHeader>
        )}
      </Media>

      <ChatConversationPaneMain>
        <ChatMessageList contact={contact} conversationId={conversationId} />
      </ChatConversationPaneMain>

      <ChatConversationPaneActions>
        <ChatMessageForm conversationId={conversationId} />
      </ChatConversationPaneActions>
    </ChatConversationPaneRoot>
  );
}

export interface ChatConversationWrapConnectedProps {
  contact: ChatContactModel;
  loading: boolean;
  initConversation: ChatInitFn;
  conversationId: string;
  onCloseClick?: () => void;
}

export class ChatConversationWrapConnected extends Component<
  ChatConversationWrapConnectedProps
> {
  componentDidMount() {
    const { contact, initConversation } = this.props;
    if (contact.user.id) {
      initConversation({
        variables: { input: contact.user.id },
        refetchQueries: [{ query: CHAT_CONTACT_QUERY }]
      }).catch(resolveGraphQLSubmitErrors);
    }
  }

  componentDidUpdate(prevProps: ChatConversationWrapConnectedProps) {
    const { contact, initConversation } = this.props;
    if (prevProps.contact.user.id !== contact.user.id) {
      initConversation({
        variables: { input: contact.user.id },
        refetchQueries: [{ query: CHAT_CONTACT_QUERY }]
      }).catch(resolveGraphQLSubmitErrors);
    }
  }

  render() {
    const { contact, conversationId, loading, onCloseClick } = this.props;
    return (
      <ChatConversationWrap>
        {loading && <LoadingScreen />}
        {conversationId && (
          <ChatConversationPane
            contact={contact}
            conversationId={conversationId}
            onCloseClick={onCloseClick}
          />
        )}
      </ChatConversationWrap>
    );
  }
}

export interface ChatConversationPaneConnectedProps {
  contact: ChatContactModel;
  onCloseClick?: () => void;
}

export function ChatConversationPaneConnected({
  contact,
  onCloseClick
}: ChatConversationPaneConnectedProps) {
  return (
    <ChatInitMutation>
      {(initConversation, { loading, error, data }) => {
        return (
          <ChatConversationWrapConnected
            contact={contact}
            loading={loading}
            initConversation={initConversation}
            conversationId={data ? data.initConversation : ''}
            onCloseClick={onCloseClick}
          />
        );
      }}
    </ChatInitMutation>
  );
}

export default ChatConversationPaneConnected;
