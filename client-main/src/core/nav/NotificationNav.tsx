import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  Dropdown,
  DropdownContainer,
  DropdownContent,
  LoadingScreen,
  styleSettings
} from '@igg/common';
import { NotificationNavButton } from '../../notifications/NotificationNavButton';
import { NotificationPane } from '../../notifications/NotificationsPane';
import { NotificationsQuery } from '../../notifications/NotificationQuery';
import { NotificationModel } from '../../notifications/types';
import { UserModel } from '../types';

const { deviceScreenQuery } = styleSettings;

const NotificationRoot = styled('div')({
  width: '100vw',

  [`@media ${deviceScreenQuery.small}`]: {
    width: 350
  }
});

const NotificationDropDownContent = styled(DropdownContent)({
  marginRight: -59,

  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: 0
  }
});

export interface NotificationNavProps {
  currentUser?: UserModel;
  notificationList: NotificationModel[];
  subscribeToNew: () => any;
}

export class NotificationNav extends Component<NotificationNavProps> {
  componentDidMount() {
    this.props.subscribeToNew();
  }

  render() {
    const { notificationList } = this.props;
    const notificationCount = notificationList.length;

    return (
      <Dropdown>
        {({ isExpanded, toggle }) => (
          <DropdownContainer>
            <NotificationNavButton
              isExpanded={isExpanded}
              onToggle={toggle}
              notificationCount={notificationCount}
            />
            <NotificationDropDownContent visible={isExpanded} alignRight={true}>
              <NotificationRoot>
                <NotificationPane notificationList={notificationList} />
              </NotificationRoot>
            </NotificationDropDownContent>
          </DropdownContainer>
        )}
      </Dropdown>
    );
  }
}

export interface NotificationNavConnectedProps {
  currentUser?: UserModel;
}

export default function NotificationNavConnected({
  currentUser
}: NotificationNavConnectedProps) {
  return (
    <NotificationsQuery
      renderLoading={() => <LoadingScreen />}
      forceRefetch={true}
    >
      {(notificationList, subscribeToNewNotifications) => (
        <NotificationNav
          currentUser={currentUser}
          notificationList={notificationList}
          subscribeToNew={subscribeToNewNotifications}
        />
      )}
    </NotificationsQuery>
  );
}
