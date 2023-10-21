import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import NotificationList from './NotificationList';
import { NotificationModel } from './types';

const { deviceScreenQuery, colors } = styleSettings;

const NotificationPaneRoot = styled('div')({
  position: 'relative'
});

const NotificationPaneHeader = styled('div')({
  fontSize: 12,
  padding: '10px 15px',
  width: '100%',
  borderBottom: '1px solid rgba(255,255,255,0.1)'
});

const NotificationPaneMain = styled('div')({
  flex: 1,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100vh - 150px)',
  padding: '0 15px',
  overflowY: 'auto',

  [`&::-webkit-scrollbar`]: {
    width: '5px'
  },

  [`&::-webkit-scrollbar-track`]: {
    backgroundColor: colors.lighterDark
  },

  [`&::-webkit-scrollbar-thumb`]: {
    backgroundColor: colors.dark,
    borderRadius: 4
  }
});

export interface NotificationPaneProps {
  notificationList?: NotificationModel[];
}

export function NotificationPane({ notificationList }: NotificationPaneProps) {
  const notificationCount = notificationList ? notificationList.length : 0;
  return (
    <NotificationPaneRoot>
      {notificationList && notificationList.length > 0 && (
        <NotificationPaneHeader>
          {notificationCount} New Notifications
        </NotificationPaneHeader>
      )}
      <NotificationPaneMain>
        <NotificationList notificationList={notificationList} />
      </NotificationPaneMain>
    </NotificationPaneRoot>
  );
}

export default NotificationPane;
