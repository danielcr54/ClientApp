import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { IoIosArrowForward } from 'react-icons/io';
import {
  ScreenNavbar,
  PrimaryNav,
  PrimaryNavLink,
  PrimaryNavItemIcon,
  PrimaryNavItemLabel,
  ScreenNavbarStart,
  ScreenNavbarEnd,
  DashboardIcon,
  TeamIcon,
  WalletIcon,
  ScreenNavbarExpandButton
} from '@igg/common';
import { UserModel } from '../types';
import { TeamLogo } from 'teams/TeamLogo';

export interface AppNavbarProps extends RouteComponentProps {
  currentUser?: UserModel;
}

export interface AppNavbarState {
  expanded?: boolean;
}

export class AppNavbar extends Component<AppNavbarProps, AppNavbarState> {
  state = {
    expanded: false
  };

  toggle = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { toggle } = this;
    const { expanded } = this.state;
    const { currentUser } = this.props;
    const userHasTeam = (currentUser && !!currentUser.team) || false;

    return (
      <ScreenNavbar stacked={true} expanded={expanded}>
        <ScreenNavbarExpandButton expanded={expanded} onClick={toggle}>
          <IoIosArrowForward />
        </ScreenNavbarExpandButton>

        <ScreenNavbarStart stacked={true}>
          <PrimaryNav stacked={true}>
            <PrimaryNavLink exact={true} to="/">
              <PrimaryNavItemIcon>
                <DashboardIcon />
              </PrimaryNavItemIcon>
              <PrimaryNavItemLabel expanded={expanded}>
                Dashboard
              </PrimaryNavItemLabel>
            </PrimaryNavLink>

            {!userHasTeam && (
              <PrimaryNavLink to="/teams">
                <PrimaryNavItemIcon data-cy="aut-b-teams">
                  <TeamIcon />
                </PrimaryNavItemIcon>
                <PrimaryNavItemLabel expanded={expanded}>
                  Teams
                </PrimaryNavItemLabel>
              </PrimaryNavLink>
            )}

            {/* <PrimaryNavLink to="/wallet">
              <PrimaryNavItemIcon>
                <WalletIcon />
              </PrimaryNavItemIcon>
              <PrimaryNavItemLabel expanded={expanded}>
                Wallet
              </PrimaryNavItemLabel>
            </PrimaryNavLink> */}

            {userHasTeam && (
              <PrimaryNavLink to="/my-team">
                <PrimaryNavItemIcon data-cy="aut-b-my-team">
                  <TeamLogo team={currentUser!.team} size={24} />
                </PrimaryNavItemIcon>
                <PrimaryNavItemLabel expanded={expanded}>
                  My Team
                </PrimaryNavItemLabel>
              </PrimaryNavLink>
            )}
          </PrimaryNav>
        </ScreenNavbarStart>

        <ScreenNavbarEnd stacked={true}>
          {/* Team meta block / badges will be here */}
        </ScreenNavbarEnd>
      </ScreenNavbar>
    );
  }
}

export default withRouter(AppNavbar);
