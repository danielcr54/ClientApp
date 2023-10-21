import React, { Component, ReactNode } from 'react';
import Media from 'react-media';
import {
  ScreenLayout,
  ScreenBody,
  ScreenBodyLayout,
  ScreenContent,
  ScreenContentContainer,
  styleSettings,
  StarBackground
} from '@igg/common';
import AppNavbar from './nav/AppNavbar';
import AppNavbarMobile from './nav/AppNavbarMobile';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

import ChatViewContext from '../chat/ChatViewContext';
import { UserModel } from './types';
import { ChatContactModel } from '../chat/types';

const { deviceScreenQuery } = styleSettings;

export interface AppScreenLayoutProps {
  children?: ReactNode;
  currentUser?: UserModel;
}

export interface AppScreenLayoutState {
  currentContact: ChatContactModel;
  chatVisible: boolean;
}

export class AppScreenLayout extends Component<
  AppScreenLayoutProps,
  AppScreenLayoutState
> {
  state = {
    currentContact: {
      user: {
        id: '',
        displayName: '',
        username: '',
        email: '',
        profile: {}
      }
    },
    chatVisible: false
  };

  onChatToggle() {
    const { chatVisible } = this.state;

    this.setState({
      chatVisible: !chatVisible
    });
  }

  onChatOpen(currentContact: ChatContactModel) {
    this.setState({
      chatVisible: true,
      currentContact
    });
  }

  onChatClose() {
    this.setState({
      currentContact: {
        user: {
          id: '',
          displayName: '',
          username: '',
          email: '',
          profile: {}
        }
      }
    });
  }

  render() {
    const { children, currentUser } = this.props;
    const { chatVisible, currentContact } = this.state;

    return (
      <ScreenLayout>
        <ChatViewContext.Provider
          value={{
            visible: chatVisible,
            currentUser,
            currentContact,
            open: this.onChatOpen.bind(this),
            close: this.onChatClose.bind(this),
            toggle: this.onChatToggle.bind(this)
          }}
        >
          <AppHeader currentUser={currentUser} />

          <Media
            query={deviceScreenQuery.smallDown}
            render={() => <AppNavbarMobile currentUser={currentUser} />}
          />
          <ScreenBody>
            <ScreenBodyLayout>
              <Media
                query={deviceScreenQuery.medium}
                render={() => <AppNavbar currentUser={currentUser} />}
              />

              <ScreenContent>
                <StarBackground />
                <ScreenContentContainer>{children}</ScreenContentContainer>
                <AppFooter />
              </ScreenContent>
            </ScreenBodyLayout>
          </ScreenBody>
        </ChatViewContext.Provider>
      </ScreenLayout>
    );
  }
}

export default AppScreenLayout;
