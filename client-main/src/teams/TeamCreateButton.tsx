import React, { Component } from 'react';
import styled from '@emotion/styled';
import { GoPlus } from 'react-icons/go';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { styleSettings } from '@igg/common';
import TeamTronLinkModal from './TeamTronLinkModal';
import { TronWebModel } from './types';

const { deviceScreenQuery, colors } = styleSettings;

const bgColor = '#393350';
const textColor = 'white';

const TeamCreateButtonRoot = styled(NavLink)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  fontSize: 15,
  padding: '25px 15px',
  fontWeight: 'normal',
  lineHeight: 1,
  border: 0,
  borderRadius: 2,
  backgroundColor: bgColor,
  color: textColor,
  textAlign: 'center',
  textDecoration: 'none',
  outline: 'none',
  transition: 'all 0.2s',

  '&:focus': {
    // backgroundColor:
  },

  '&:hover, &:hover:focus': {
    // TODO: Make a variable (its same as a focused input)
    backgroundColor: '#4d3e74',
    textDecoration: 'none',
    cursor: 'pointer'
  },

  '&:active, &:active:hover': {
    // backgroundColor:
  }
});

export const TeamCreateButtonIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  fontSize: 18,
  borderRadius: 2,
  backgroundColor: colors.main,
  color: 'white',

  '&:not(:last-of-type)': {
    marginBottom: 22
  }
});

export const TeamCreateButtonLabel = styled('div')({
  fontSize: 15,
  color: 'white',

  '&:not(:last-of-type)': {
    marginBottom: 8
  }
});

export const TeamCreateButtonSublabel = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)'
});

interface TronWindow extends Window {
  tronWeb?: any;
}

export interface TeamCreateButtonState {
  tronWeb: TronWebModel;
}

export class TeamCreateButton extends Component<any, TeamCreateButtonState> {
  state = {
    tronWeb: {
      installed: !!(window as TronWindow).tronWeb,
      loggedIn:
        (window as TronWindow).tronWeb && (window as TronWindow).tronWeb.ready
    }
  };

  onCreateTeam(event: React.MouseEvent, open: () => void) {
    const tronWindow: TronWindow = window;
    const tronWebState = {
      installed: !!tronWindow.tronWeb,
      loggedIn: tronWindow.tronWeb && tronWindow.tronWeb.ready
    };

    this.setState({
      tronWeb: tronWebState
    });

    if (!tronWebState.installed || !tronWebState.loggedIn) {
      event.preventDefault();

      open();
    }
  }

  onTronRetry() {
    const tronWindow: TronWindow = window;
    const tronWebState = {
      installed: !!tronWindow.tronWeb,
      loggedIn: tronWindow.tronWeb && tronWindow.tronWeb.ready
    };

    this.setState({
      tronWeb: tronWebState
    });
  }

  render() {
    const { tronWeb } = this.state;
    return (
      <>
        <TeamTronLinkModal
          tronState={tronWeb}
          onRetry={() => this.onTronRetry()}
        >
          {({ open, isOpen }) => (
            <>
              <TeamCreateButtonRoot
                to="/teams/create"
                onClick={event => this.onCreateTeam(event, open)}
              >
                <TeamCreateButtonIcon>
                  <GoPlus />
                </TeamCreateButtonIcon>
                <TeamCreateButtonLabel>Create Team</TeamCreateButtonLabel>
                <TeamCreateButtonSublabel>
                  100,000 IGG via TronLink
                </TeamCreateButtonSublabel>
              </TeamCreateButtonRoot>
            </>
          )}
        </TeamTronLinkModal>
      </>
    );
  }
}

export default TeamCreateButton;
