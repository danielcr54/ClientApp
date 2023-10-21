import React from 'react';
import {
  ScreenHeaderNavButton,
  Dropdown,
  DropdownContainer,
  DropdownContent
} from '@igg/common';
import { UserModel } from '../types';
import { UserAvatar } from '../../shared/UserAvatar';
import { UserMenu } from './UserMenu';

export interface UserNavProps {
  currentUser?: UserModel;
}

export function UserNav({ currentUser }: UserNavProps) {
  return (
    <Dropdown>
      {({ isExpanded, toggle, hide }) => (
        <DropdownContainer>
          <ScreenHeaderNavButton onClick={toggle} active={isExpanded} data-cy="aut-b-header-user">
            <UserAvatar user={currentUser} size={32} />
          </ScreenHeaderNavButton>

          <DropdownContent visible={isExpanded} alignRight={true}>
            {currentUser && (
              <UserMenu currentUser={currentUser} onClick={hide} />
            )}
          </DropdownContent>
        </DropdownContainer>
      )}
    </Dropdown>
  );
}

export default UserNav;
