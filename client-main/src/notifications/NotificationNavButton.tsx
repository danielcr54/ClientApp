import React from 'react';
import styled from '@emotion/styled';
import {
  ScreenHeaderNavButton,
  NotificationsIcon,
  styleSettings
} from '@igg/common';
const { colors } = styleSettings;

const NotificationsCountBadge = styled('span')({
  display: 'block',
  borderRadius: '10px',
  backgroundColor: colors.main,
  border: '1px solid black',
  color: 'white',
  fontSize: 10,
  marginLeft: '-8px',
  lineHeight: '10px',
  padding: '1px 4px'
});

export interface NotificationNavButtonProps {
  notificationCount?: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function NotificationNavButton({
  notificationCount,
  isExpanded,
  onToggle
}: NotificationNavButtonProps) {
  return (
    <ScreenHeaderNavButton fontSize={24} onClick={onToggle} active={isExpanded} data-cy="aut-b-header-notifications">
      <NotificationsIcon />
      {notificationCount !== 0 && (
        <NotificationsCountBadge>{notificationCount}</NotificationsCountBadge>
      )}
    </ScreenHeaderNavButton>
  );
}
