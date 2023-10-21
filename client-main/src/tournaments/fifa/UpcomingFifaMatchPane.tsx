import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { UserModel } from '../../core/types';
import { FifaMatchModel } from '../types';
// import { FifaMatchTeamActionCard } from './FifaMatchTeamActionCard';
import { FifaMatchPlayerActionCard } from './FifaMatchPlayerActionCard';
import { resolveMatchPlayers } from '../tournamentHelpers';

const { deviceScreenQuery } = styleSettings;

// Styled helpers

const UpcomingFifaMatchPaneRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',

  '&:not(:last-of-type)': {
    marginBottom: 15
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

const UpcomingFifaMatchPaneItem = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',

  '&:not(:last-of-type)': {
    marginBottom: 15
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    '&:not(:last-of-type)': {
      marginBottom: 0,
      marginRight: 15
    }
  }
});

// Exported component

export interface UpcomingFifaMatchPaneProps {
  tournamentUrlSlug: string;
  consoleIds: string[];
  match: FifaMatchModel;
  isTeamMatch?: boolean;
  currentUser: UserModel;
}

export function UpcomingFifaMatchPane({
  tournamentUrlSlug,
  consoleIds,
  match,
  isTeamMatch,
  currentUser
}: UpcomingFifaMatchPaneProps) {
  const { player, opponentPlayer } = resolveMatchPlayers(match, currentUser);

  return (
    <UpcomingFifaMatchPaneRoot>
      {/* Your block */}
      <UpcomingFifaMatchPaneItem>
        {isTeamMatch ? (
          <></>
        ) : (
          <FifaMatchPlayerActionCard
            tournamentUrlSlug={tournamentUrlSlug}
            match={match}
            player={player}
          />
        )}
      </UpcomingFifaMatchPaneItem>

      {/* Opponent block */}
      <UpcomingFifaMatchPaneItem>
        {isTeamMatch ? (
          <></>
        ) : (
          <FifaMatchPlayerActionCard
            tournamentUrlSlug={tournamentUrlSlug}
            match={match}
            player={opponentPlayer}
            isOpponent={true}
            consoleIds={consoleIds}
          />
        )}
      </UpcomingFifaMatchPaneItem>
    </UpcomingFifaMatchPaneRoot>
  );
}
