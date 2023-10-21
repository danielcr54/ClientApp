import React from 'react';
import styled from '@emotion/styled';
import { NoContent, styleSettings } from '@igg/common';
import NotificationListItem from './NotificationListItem';
import { NotificationModel } from './types';

const { colors, deviceScreenQuery } = styleSettings;

export const NotificationListRoot = styled('div')({
  // TODO
});

const NotificationListItemDivider = styled('div')({
  width: '100%',
  height: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  marginTop: 5,
  marginBottom: 5
});

export interface NotificationListProps {
  notificationList?: NotificationModel[];
}

export function NotificationList({ notificationList }: NotificationListProps) {
  return (
    <NotificationListRoot>
      {notificationList &&
        notificationList.length > 0 &&
        notificationList.map((notification, index) => (
          <React.Fragment key={index}>
            <NotificationListItem notification={notification} />
            {index !== notificationList.length - 1 && (
              <NotificationListItemDivider />
            )}
          </React.Fragment>
        ))}
      {!notificationList ||
        (notificationList.length === 0 && (
          <NoContent small={true} message={`0 Notifications`} />
        ))}
    </NotificationListRoot>
  );
}

export default NotificationList;
