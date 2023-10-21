import React, { Component, ReactNode } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  SelectLikeButton,
  Dropdown,
  DropdownContent,
  styleSettings
} from '@igg/common';
import { UserModel } from '../core/types';
import { PlayerMediaObject } from '../players/PlayerMediaObject';
import { PlayerList, PlayerListItem } from '../players/PlayerList';

const { fonts, inputColors, colors } = styleSettings;

// TEMP

const tempTeamData = {
  id: 'team1',
  name: 'Team 1',
  urlSlug: 'team-1',
  countryCode: 'gb',
  languages: ['en-GB']
};

const tempPlayersData = [
  {
    id: 'player1',
    displayName: 'user 1',
    username: 'playerone',
    email: 'playerone@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'One',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  },
  {
    id: 'player2',
    displayName: 'user 2',
    username: 'playertwo',
    email: 'playertwo@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'Two',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  },
  {
    id: 'player3',
    displayName: 'user 3',
    username: 'playerthree',
    email: 'playerthree@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'Three',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  }
];

// Helper styled components

const ContextLabel = styled('div')({
  marginBottom: 15,
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});

const MatchPlayersSelectRoot = styled('div')({
  width: '100%'
});

const MatchPlayersSelectDropdown = styled(Dropdown)({
  width: '100%',
  marginBottom: 15
});

const MatchPlayersSelectMenu = styled('div')({
  width: '100%',
  maxHeight: 250,
  overflowY: 'scroll'
});

const MatchPlayersSelectMenuItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: 'transparent',
  transition: 'all 0.2s',
  color: 'rgba(255, 255, 255, 0.55)',

  '&:hover': {
    backgroundColor: '#764cb3',
    color: colors.white,
    cursor: 'pointer'
  },

  '&:active': {
    backgroundColor: colors.main,
    color: colors.white
  }
});

// Helpers

function renderExtraEmptyPlayers(count: number) {
  return ([] as ReactNode[]).fill(
    <PlayerListItem>
      <PlayerMediaObject />
    </PlayerListItem>,
    0,
    count - 1
  );
}

// Exported components

export interface MatchPlayersSelectProps {
  contextLabel?: string;
  playersRequired?: number;
  players: UserModel[];
  selectedPlayers?: UserModel[];
  onPlayerSelect: (player: UserModel) => void;
}

export class MatchPlayersSelect extends Component<MatchPlayersSelectProps> {
  render() {
    const { onPlayerSelect, contextLabel, playersRequired } = this.props;
    const players: UserModel[] = tempPlayersData;
    const selectedPlayers: UserModel[] = tempPlayersData;
    const currentUser = tempPlayersData[0];

    return (
      <MatchPlayersSelectRoot>
        {contextLabel && <ContextLabel>{contextLabel}</ContextLabel>}

        <MatchPlayersSelectDropdown>
          {({ isExpanded, toggle, hide }) => (
            <>
              <SelectLikeButton small={true} onClick={toggle}>
                Players ({players.length})
              </SelectLikeButton>

              <DropdownContent
                visible={isExpanded}
                alignRight={true}
                stretch={true}
              >
                <MatchPlayersSelectMenu>
                  {players.map(player => (
                    <MatchPlayersSelectMenuItem
                      key={player.id}
                      onClick={() => {
                        if (typeof onPlayerSelect === 'function') {
                          onPlayerSelect(player);
                        }

                        hide();
                      }}
                    >
                      <PlayerMediaObject player={player} />
                    </MatchPlayersSelectMenuItem>
                  ))}
                </MatchPlayersSelectMenu>
              </DropdownContent>
            </>
          )}
        </MatchPlayersSelectDropdown>

        <PlayerList>
          {selectedPlayers.map(player => (
            <PlayerListItem key={player.id}>
              <PlayerMediaObject
                player={player}
                isCurrentUser={player.id === currentUser.id}
                statusLabel="Pending"
                renderActionsBlock={() => (
                  <Button small={true} transparent={true} noPadding={true}>
                    Delete
                  </Button>
                )}
              />
            </PlayerListItem>
          ))}

          {playersRequired &&
            selectedPlayers.length < playersRequired &&
            renderExtraEmptyPlayers(playersRequired - selectedPlayers.length)}
        </PlayerList>
      </MatchPlayersSelectRoot>
    );
  }
}

export default MatchPlayersSelect;
