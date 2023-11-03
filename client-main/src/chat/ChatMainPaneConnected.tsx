import React, { Component } from 'react';
import { ChatContactModel } from './types';
import ChatContactsQuery from './ChatUserQuery';
import ChatSearchUserQuery from './ChatSearchUserQuery';
import { ChatConversationSubscription } from './ChatConversationQuery';
import ChatMainPane from './ChatMainPane';

export interface ChatMainPaneConnectedProps {
  currentChatUser?: ChatContactModel;
  onContactClick?: (contact: ChatContactModel) => void;
}

export interface ChatMainPaneConnectedState {
  searchTerm?: string;
}

export class ChatMainPaneConnected extends Component<
  ChatMainPaneConnectedProps,
  ChatMainPaneConnectedState
> {
  state = {
    searchTerm: ''
  };

  onSearchContacts(searchTerm: string) {
    this.setState({
      searchTerm
    });
  }

  render() {
    const { currentChatUser, onContactClick } = this.props;
    const { searchTerm } = this.state;
    return (
      <ChatContactsQuery>
        {(
          conversations: ChatContactModel[],
          loading: boolean,
          subscribeToNewContacts: () => void,
          refetch: () => void
        ) => {
          let otherContacts = conversations.filter(contact => contact.user);
          let teamContacts = [] as ChatContactModel[];
          if (currentChatUser) {
            teamContacts = conversations.filter(
              contact =>
                contact.user &&
                contact.user.teamId === currentChatUser.user.teamId
            );
            otherContacts = conversations.filter(
              contact =>
                contact.user &&
                contact.user.teamId !== currentChatUser.user.teamId
            );
          }

          return (
            <ChatSearchUserQuery variables={{ searchTerm }}>
              {({ contacts, loading: isSearching, error, totalCount }) => (
                <>
                  <ChatConversationSubscription
                    onNewMessage={() => refetch()}
                  />
                  <ChatMainPane
                    currentChatUser={currentChatUser}
                    otherContacts={
                      searchTerm && searchTerm !== ''
                        ? contacts
                        : otherContacts || []
                    }
                    teamContacts={
                      searchTerm && searchTerm !== '' ? [] : teamContacts
                    }
                    loading={isSearching}
                    subscribeToNewContacts={subscribeToNewContacts}
                    onContactClick={onContactClick}
                    onSearchContacts={(searchStr: string) =>
                      this.onSearchContacts(searchStr)
                    }
                  />
                </>
              )}
            </ChatSearchUserQuery>
          );
        }}
      </ChatContactsQuery>
    );
  }
}

export default ChatMainPaneConnected;
