import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { FifaTournamentStatus } from './types';

const { colors } = styleSettings;

export const StyledTournamentStatusLabel = styled('div')(
  ({ status }: Partial<TournamentStatusLabelProps>) => ({
    display: 'inline-block',
    padding: '2px 6px',
    fontSize: 13,
    lineHeight: 1.2,
    fontWeight: 400,
    borderRadius: 2,
    backgroundColor:
      status === FifaTournamentStatus.UPCOMING
        ? colors.success
        : colors.paleMain,
    color: colors.white
  })
);

const labels = {
  [FifaTournamentStatus.UPCOMING]: 'Upcoming',
  [FifaTournamentStatus.IN_PROGRESS]: 'In progress',
  [FifaTournamentStatus.COMPLETED]: 'Completed'
};

export interface TournamentStatusLabelProps {
  status: FifaTournamentStatus;
}

export function TournamentStatusLabel({ status }: TournamentStatusLabelProps) {
  return (
    <StyledTournamentStatusLabel status={status}>
      {(labels[status] || 'Unknown').toUpperCase()}
    </StyledTournamentStatusLabel>
  );
}
