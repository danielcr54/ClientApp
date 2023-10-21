import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { FifaTournamentRoundModel } from './types';
import {
  formatRoundName,
  formatRoundTimeString,
  isRoundUpcoming,
  isRoundInProgress,
  isRoundCompleted,
  getShownRounds
} from './tournamentHelpers';

const { colors, deviceScreenQuery } = styleSettings;

// A set of feature-agnostic helper styled components
// to be across "Tournaments"

// NOTE: Some of them are to be extracted to a separate component file
// once grows large/complex enough

// UI / styled

export const StyledTournamentRoundInfoBlocks = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 15,

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

export const TournamentRoundInfoBlockWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  marginBottom: 16
});

export interface TournamentRoundInfoBlockStyledProps {
  upcoming?: boolean;
  inProgress?: boolean;
  completed?: boolean;
}

const TournamentRoundInfoBlockRoot = styled('div')(
  ({
    upcoming,
    inProgress,
    completed
  }: TournamentRoundInfoBlockStyledProps) => ({
    position: 'relative',
    width: '100%',
    padding: '12px 15px',
    paddingLeft: upcoming || inProgress ? 19 : 15,
    border: '1px solid #393350',
    backgroundColor: completed ? '#393350' : 'transparent',

    [`@media ${deviceScreenQuery.small}`]: {
      flex: 1,
      width: 'auto',

      '&:not(:last-of-type)': {
        marginRight: 2
      }
    },

    '&::before': {
      display: upcoming || inProgress ? 'block' : 'none',
      content: '""',
      position: 'absolute',
      top: -1,
      bottom: -1,
      left: -1,
      width: 5,
      backgroundColor: colors.main
    }
  })
);

const TournamentRoundInfoBlockLabel = styled('div')({
  marginBottom: 3,
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

const TournamentRoundInfoBlockData = styled('div')({
  fontSize: 18,
  color: colors.white,
  textTransform: 'uppercase',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

const TournamentRoundInfoBlockDataNote = styled('span')({
  fontStyle: 'italic',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',
  textTransform: 'none'
  // marginLeft: 10
});

// Exported components

export interface TournamentRoundInfoBlockProps {
  round: FifaTournamentRoundModel;
  upcoming?: boolean;
}

export function TournamentRoundInfoBlock({
  round,
  upcoming
}: TournamentRoundInfoBlockProps) {
  return (
    <TournamentRoundInfoBlockRoot
      key={round.id}
      inProgress={isRoundInProgress(round)}
      completed={isRoundCompleted(round)}
      upcoming={upcoming}
    >
      <TournamentRoundInfoBlockLabel>
        {formatRoundName(round)}
      </TournamentRoundInfoBlockLabel>

      <TournamentRoundInfoBlockData>
        {round.startTime && round.endTime ? (
          formatRoundTimeString(round.startTime, round.endTime)
        ) : (
          <TournamentRoundInfoBlockDataNote>
            Time to be set
          </TournamentRoundInfoBlockDataNote>
        )}
      </TournamentRoundInfoBlockData>
    </TournamentRoundInfoBlockRoot>
  );
}

export interface TournamentRoundInfoBlocksProps {
  rounds: FifaTournamentRoundModel[];
}

export function TournamentRoundInfoBlocks({
  rounds
}: TournamentRoundInfoBlocksProps) {
  // NOTE: Assuming rounds to be pre-sorted
  const shownRounds = getShownRounds(rounds);

  return (
    <StyledTournamentRoundInfoBlocks>
      {shownRounds.map(round => (
        <TournamentRoundInfoBlock
          key={round.id}
          round={round}
          upcoming={isRoundUpcoming(round, rounds)}
        />
      ))}
    </StyledTournamentRoundInfoBlocks>
  );
}
