import React from 'react';
import { withRouter } from 'react-router';
import styled from '@emotion/styled';
import {
  ScreenNavbar,
  ScreenNavbarStart,
  ScreenNavbarEnd,
  DashboardIcon,
  TeamIcon,
  WalletIcon,
  PrimaryNav,
  PrimaryNavLink,
  ButtonNavLink,
  styleSettings
} from '@igg/common';
import { TeamLogo } from '../../teams/TeamLogo';
import { AppNavbarProps } from './AppNavbar';

const { deviceScreenQuery } = styleSettings;

// Visual helpers

// TODO: Refactor to be reusable/generic and move to `common`
const NavbarButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`@media ${deviceScreenQuery.mediumDown}`]: {
    padding: '8px 12px'
  }
});

export function AppNavbarMobile({ currentUser }: AppNavbarProps) {
  const userHasTeam = (currentUser && !!currentUser.team) || false;

  return (
    <ScreenNavbar>
      <ScreenNavbarStart>
        <PrimaryNav>
          <PrimaryNavLink exact={true} to="/">
            <DashboardIcon />
          </PrimaryNavLink>

          {!userHasTeam && (
            <PrimaryNavLink to="/teams">
              <TeamIcon />
            </PrimaryNavLink>
          )}

          {/* <PrimaryNavLink to="/wallet">
            <WalletIcon />
          </PrimaryNavLink> */}

          {userHasTeam && (
            <PrimaryNavLink to="/my-team">
              <TeamLogo team={currentUser!.team} size={24} />
            </PrimaryNavLink>
          )}
        </PrimaryNav>
      </ScreenNavbarStart>

      <ScreenNavbarEnd>
        {!userHasTeam && (
          <NavbarButtonContainer>
            <ButtonNavLink
              to="/teams/create"
              small={true}
              inverse={true}
              glow={true}
            >
              Create a team
            </ButtonNavLink>
          </NavbarButtonContainer>
        )}
      </ScreenNavbarEnd>
    </ScreenNavbar>
  );
}

export default withRouter(AppNavbarMobile);
