import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { GoKebabHorizontal } from 'react-icons/go';
import {
  styleSettings,
  Button,
  Dropdown,
  DropdownContainer,
  DropdownContent,
  DropdownContentProps
} from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

// TODO: Make this component also have a global effect on viewport:
// should block the `<body>` scrolling when active on mobile

// Trigger button

const ItemActionMenuTriggerButtonRoot = styled(Button)({
  padding: 0,
  fontSize: 16,
  lineHeight: 1
});

export function ItemActionMenuTriggerButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <ItemActionMenuTriggerButtonRoot {...props} transparent={true} small={true}>
      <GoKebabHorizontal />
    </ItemActionMenuTriggerButtonRoot>
  );
}

// Dropdown container

const borderColor = 'rgba(255, 255, 255, 0.1)';
const bgColor = colors.fadedLighterDark;

const ItemActionMenuDropdownContent = styled(DropdownContent)(
  ({ alignRight, visible }: DropdownContentProps) => ({
    marginTop: 6,
    marginRight: alignRight ? -6 : 0,
    marginLeft: alignRight ? 0 : -6,
    borderRadius: 3,
    backgroundColor: bgColor,
    border: `1px solid ${borderColor}`,
    pointerEvents: visible ? 'auto' : 'none',

    '&::before': {
      content: '" "',
      position: 'absolute',
      top: -9,
      right: 9,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderColor: `transparent transparent ${borderColor} transparent`,
      borderWidth: '0 5px 9px 5px'
    },

    '&::after': {
      content: '" "',
      position: 'absolute',
      top: -7.1,
      right: 10,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderColor: `transparent transparent ${bgColor} transparent`,
      borderWidth: '0 4.4px 8px 4.4px'
    }
  })
);

// Menu

const ItemActionMenuContainer = styled('div')({
  padding: '10px 0',

  '&:not(:last-of-type)': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    minWidth: 160,
    padding: '5px 15px',
    borderBottom: 'none'
  }
});

export const ItemActionMenuDivider = styled('div')({
  width: '100%',
  height: 1,
  marginTop: 5,
  marginBottom: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
});

export const ItemActionMenuItem = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
  fontSize: 18,
  color: '#231f32',
  textAlign: 'center',

  [`@media ${deviceScreenQuery.medium}`]: {
    justifyContent: 'flex-start',
    padding: '8px 0',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'left',

    '&:not(:last-of-type)': {
      marginBottom: 3,
      paddingBottom: 12,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }
  }
});

export const ItemActionMenuButton = styled(ItemActionMenuItem)({
  '&:focus': {
    color: '#231f32'
  },

  '&:hover, &:active, &:hover:active': {
    color: '#6c45a3',
    textDecoration: 'none',
    cursor: 'pointer'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    color: 'rgba(255, 255, 255, 0.55)',

    '&:focus': {
      color: 'rgba(255, 255, 255, 0.55)'
    },

    '&:hover, &:active, &:hover:active': {
      color: 'white'
    }
  }
});

export const ItemActionMenuLink = ItemActionMenuButton.withComponent(NavLink);

// Mobile-specific components

const ItemActionMenuDropdownContentMobile = styled('div')(
  ({ visible }: DropdownContentProps) => ({
    position: 'fixed',
    zIndex: 2,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(100%)',
    transition: 'all 0.2s',
    pointerEvents: visible ? 'auto' : 'none'
  })
);

const ItemActionMenuMobileActions = styled('div')({});

const ItemActionMenuMobileCancelButton = styled('div')({
  width: '100%',
  padding: 20,
  fontSize: 10,
  fontWeight: 500,
  color: colors.main,
  backgroundColor: 'transparent',
  textTransform: 'uppercase',
  textAlign: 'center',
  transition: 'all 0.2s'
});

// Mobile backdrop

interface ItemActionMenuMobileBackdropProps {
  visible?: boolean;
}

const ItemActionMenuMobileBackdrop = styled('div')(
  ({ visible }: ItemActionMenuMobileBackdropProps) => ({
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#200f38',
    opacity: visible ? 0.5 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'all 0.2s',

    [`@media ${deviceScreenQuery.medium}`]: {
      display: 'none'
    }
  })
);

// Composite component

export interface ItemActionMenuProps {
  children?: ReactNode;
}

export function ItemActionMenu({ children }: ItemActionMenuProps) {
  return (
    <Dropdown>
      {({ isExpanded, toggle, hide }) => (
        <DropdownContainer>
          <ItemActionMenuTriggerButton onClick={toggle} data-cy="aut-b-more-options" />

          <Media
            query={deviceScreenQuery.smallDown}
            render={() => (
              <>
                <ItemActionMenuMobileBackdrop
                  visible={isExpanded}
                  onClick={hide}
                />
                <ItemActionMenuDropdownContentMobile visible={isExpanded}>
                  <ItemActionMenuContainer>{children}</ItemActionMenuContainer>
                  <ItemActionMenuMobileActions>
                    <ItemActionMenuMobileCancelButton onClick={hide}>
                      Cancel
                    </ItemActionMenuMobileCancelButton>
                  </ItemActionMenuMobileActions>
                </ItemActionMenuDropdownContentMobile>
              </>
            )}
          />

          <Media
            query={deviceScreenQuery.medium}
            render={() => (
              <ItemActionMenuDropdownContent
                visible={isExpanded}
                alignRight={true}
              >
                <ItemActionMenuContainer>{children}</ItemActionMenuContainer>
              </ItemActionMenuDropdownContent>
            )}
          />
        </DropdownContainer>
      )}
    </Dropdown>
  );
}
