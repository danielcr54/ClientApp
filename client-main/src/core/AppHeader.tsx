import React from 'react';
import Media from 'react-media';
import {
  ScreenHeader,
  ScreenHeaderStart,
  ScreenHeaderEnd,
  ScreenHeaderItem,
  ScreenHeaderLogoLink,
  ScreenHeaderNavButton,
  ButtonNavLink,
  NotificationsIcon,
  styleSettings
} from '@igg/common';
import UserNav from './nav/UserNav';
import ChatNav from './nav/ChatNav';
import JiraIssueNav from './nav/JiraIssueNav';
import GameTitleNav from './nav/GameTitleNav';
import NotificationNav from './nav/NotificationNav';
import { UserModel } from './types';

const { deviceScreenQuery } = styleSettings;

export interface AppHeaderProps {
  currentUser?: UserModel;
}

export function AppHeader({ currentUser }: AppHeaderProps) {
  const userHasTeam = currentUser && !!currentUser.team;

  return (
    <ScreenHeader>
      <ScreenHeaderStart>
        <ScreenHeaderLogoLink to="/" data-cy="aut-b-header-logo" />

        <GameTitleNav />

        {!userHasTeam && (
          <Media
            query={deviceScreenQuery.large}
            render={() => (
              <ScreenHeaderItem>
                <ButtonNavLink
                  to="/teams/create"
                  small={true}
                  inverse={true}
                  glow={true}
                >
                  Create a team
                </ButtonNavLink>
              </ScreenHeaderItem>
            )}
          />
        )}
      </ScreenHeaderStart>

      <ScreenHeaderEnd>
        <JiraIssueNav />
        
        <ChatNav />

        <NotificationNav currentUser={currentUser} />

        <UserNav currentUser={currentUser} />
      </ScreenHeaderEnd>
    </ScreenHeader>
  );
}

export default AppHeader;
