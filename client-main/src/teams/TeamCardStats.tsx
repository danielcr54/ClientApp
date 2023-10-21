import React from 'react';
import {
  CardSection,
  CardRow,
  CardCell,
  CardStat,
  CardStatLabel,
  CardStatValue
} from '../shared/card';
import { TeamModel } from './types';

export interface TeamCardStatsProps {
  team?: TeamModel; // Or a specialized TeamStatsModel?
  large?: boolean;
}

export function TeamCardStats({ team, large }: TeamCardStatsProps) {
  // TODO: Show "skeleton" view if no team data or no team stats is passed

  return (
    <CardSection borderTop={true}>
      <CardRow>
        <CardCell borderRight={true} large={large}>
          <CardStat>
            <CardStatValue>16</CardStatValue>
            <CardStatLabel>Played</CardStatLabel>
          </CardStat>
        </CardCell>

        <CardCell borderRight={true} large={large}>
          <CardStat>
            <CardStatValue>6</CardStatValue>
            <CardStatLabel>Won</CardStatLabel>
          </CardStat>
        </CardCell>

        <CardCell large={large}>
          <CardStat>
            <CardStatValue>10</CardStatValue>
            <CardStatLabel>Lost</CardStatLabel>
          </CardStat>
        </CardCell>
      </CardRow>
    </CardSection>
  );
}

export default TeamCardStats;
