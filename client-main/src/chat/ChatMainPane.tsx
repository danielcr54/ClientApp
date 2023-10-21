import React, { Component } from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { TeamLogo } from '../teams/TeamLogo';
import ChatSearch from './ChatSearch';
import { ChatNavPlaceholder } from './ChatNavPlaceholder';
import {
  ChatNavSection,
  ChatNavSectionHeader,
  ChatNavSectionHeaderFigure,
  ChatNavSectionBody,
  ChatContactList
} from './chatElements';
import { ChatContactListItem } from './ChatContactListItem';
import { ChatContactModel } from './types';
import ChatContactsQuery from './ChatUserQuery';
import ChatSearchUserQuery from './ChatSearchUserQuery';
import { ChatConversationSubscription } from './ChatConversationQuery';

const { deviceScreenQuery, colors } = styleSettings;

// Styled helpers

const ChatMainPaneRoot = styled('div')({
  flex: 1,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  fontSize: 13,
  backgroundColor: colors.fadedLighterDark,
  color: colors.white,
  overflowY: 'auto',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexBasis: 180,
    width: 180,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0
  }
});

interface ChatMainPaneSectionProps {
  main?: boolean;
}

const ChatMainPaneSection = styled('div')(
  ({ main }: ChatMainPaneSectionProps) => ({
    flexGrow: main ? 1 : 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch'
  })
);

// Exported component
export interface ChatMainPaneProps {
  currentChatUser?: ChatContactModel;
  otherContacts: ChatContactModel[];
  teamContacts: ChatContactModel[];
  loading: boolean;
  subscribeToNewContacts: () => void;
  onContactClick?: (contact: ChatContactModel) => void;
  onSearchContacts: (searchTerm: string) => void;
}

export class ChatMainPane extends Component<ChatMainPaneProps> {
  componentDidMount() {
    const { subscribeToNewContacts } = this.props;

    subscribeToNewContacts();
  }

  render() {
    const {
      currentChatUser,
      otherContacts,
      teamContacts,
      loading,
      onContactClick,
      onSearchContacts
    } = this.props;

    return (
      <ChatMainPaneRoot>
        <ChatMainPaneSection>
          <ChatSearch inProgress={loading} onSearch={onSearchContacts} />
        </ChatMainPaneSection>

        <ChatMainPaneSection main={true}>
          {currentChatUser && currentChatUser.user.team && (
            <ChatNavSection>
              <ChatNavSectionHeader>
                <ChatNavSectionHeaderFigure>
                  <Media query={deviceScreenQuery.medium}>
                    {largeScreen => (
                      <TeamLogo
                        size={largeScreen ? 24 : 32}
                        team={currentChatUser.user.team}
                      />
                    )}
                  </Media>
                </ChatNavSectionHeaderFigure>
                {currentChatUser.user.team.name} members
              </ChatNavSectionHeader>

              <ChatNavSectionBody>
                <ChatContactList>
                  {teamContacts.map(contact => (
                    <ChatContactListItem
                      key={contact.user.id}
                      contact={contact}
                      onClick={onContactClick}
                    />
                  ))}
                </ChatContactList>
              </ChatNavSectionBody>
            </ChatNavSection>
          )}
          {otherContacts.length > 0 && (
            <ChatNavSection>
              <ChatNavSectionHeader>Contacts</ChatNavSectionHeader>

              <ChatNavSectionBody>
                {otherContacts.map(contact =>
                  contact.user ? (
                    <ChatContactListItem
                      key={contact.user.id}
                      contact={contact}
                      onClick={onContactClick}
                    />
                  ) : null
                )}
              </ChatNavSectionBody>
            </ChatNavSection>
          )}

          {otherContacts.length === 0 && (
            <ChatNavPlaceholder
              message="No conversations yet"
              note="Use the field above to search for new people"
            />
          )}
        </ChatMainPaneSection>
      </ChatMainPaneRoot>
    );
  }
}

export default ChatMainPane;
