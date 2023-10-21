import React, { ComponentType, ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { IoIosLogOut, IoIosCog, IoMdPersonAdd, IoMdHand } from 'react-icons/io';
import { MdPerson, MdLock, MdPersonPin } from 'react-icons/md';
import { styleSettings, TeamIcon } from '@igg/common';
import { UserModel } from '../types';

const { colors } = styleSettings;

// Visual components

const UserMenuRoot = styled('div')({
  width: 240
});

// Visual helpers (should be abstracted to `common`)

interface MenuItemRoot {
  selected?: boolean;
}

const MenuItemRoot = styled(NavLink)(({ selected }: MenuItemRoot) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: selected ? colors.main : 'transparent',
  transition: 'all 0.2s',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: selected ? colors.main : '#764cb3',
    textDecoration: 'none',
    cursor: selected ? 'default' : 'pointer'
  }
}));

const MenuItemIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: 45,
  padding: '10px 10px 10px 15px',
  fontSize: 20,
  color: 'white'
});

const MenuItemBody = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: 15,
  paddingLeft: 0
});

const MenuItemLabel = styled('div')({
  fontSize: 14,
  color: 'white'
});

const MenuItemDivider = styled('div')({
  width: '100%',
  height: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  marginTop: 5,
  marginBottom: 5
});

interface MenuItemProps extends NavLinkProps {
  icon?: ComponentType;
  children?: ReactNode;
  selected?: boolean;
}

// TEMP (will be extracted to `common` soon)
export function MenuItem({
  children,
  icon,
  selected,
  ...navLinkProps
}: MenuItemProps) {
  const Icon = icon;

  return (
    <MenuItemRoot {...navLinkProps}>
      <MenuItemIcon>{Icon && <Icon />}</MenuItemIcon>
      <MenuItemBody>
        <MenuItemLabel>{children}</MenuItemLabel>
      </MenuItemBody>
    </MenuItemRoot>
  );
}

// Exported / behavior components

export interface UserMenuProps {
  currentUser: UserModel;
  onClick?: () => void;
}

export function UserMenu({ currentUser, onClick }: UserMenuProps) {
  function handleClick() {
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  return (
    <UserMenuRoot onClick={handleClick}>
      <MenuItem to={`/players/${currentUser.username}`} icon={MdPersonPin} data-cy="aut-b-user-profile">
        {currentUser.username}
      </MenuItem>

      <MenuItem to="/profile/edit" icon={MdPerson} data-cy="aut-b-edit-profile">
        Edit Profile
      </MenuItem>

      {/* Disabled until username/email address is changeable (full open public launch) */}
      {/* <MenuItem to="/settings/account" icon={IoIosCog}>
        Settings
      </MenuItem> */}

      <MenuItem to="/settings/password" icon={MdLock} data-cy="aut-b-change-password">
        Change Password
      </MenuItem>

      <MenuItemDivider />

      <MenuItem to="/invite-requests" icon={IoMdHand} data-cy="aut-b-my-team-applications">
        My Team Applications
      </MenuItem>

      <MenuItem to="/invites" icon={IoMdPersonAdd} data-cy="aut-b-my-team-offers">
        My Team Offers
      </MenuItem>

      <MenuItem to="/teams" icon={TeamIcon} data-cy="aut-b-search-team">
        Teams in the IGGalaxy
      </MenuItem>

      <MenuItemDivider />

      <MenuItem to="/logout" icon={IoIosLogOut} data-cy="aut-b-log-out">
        Return to Earth (Sign&nbsp;Out)
      </MenuItem>
    </UserMenuRoot>
  );
}

export default UserMenu;
