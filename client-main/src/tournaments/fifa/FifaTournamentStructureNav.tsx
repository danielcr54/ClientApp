import React from 'react';
import { Tabs, Tab } from '@igg/common';
import {
  FifaTournamentModel,
  FifaTournamentRoundModel,
  FifaTournamentGroupModel
} from '../types';
import {
  formatGroupName,
  formatRoundName,
  getNonGroupRounds
} from '../tournamentHelpers';

export interface FifaTournamentStructureNavProps {
  tournament: FifaTournamentModel;
  shownRound?: FifaTournamentRoundModel;
  shownGroup?: FifaTournamentGroupModel;
  onRoundSelect?: (round: FifaTournamentRoundModel) => void;
  onGroupSelect?: (group: FifaTournamentGroupModel) => void;
}

export function FifaTournamentStructureNav({
  tournament,
  shownRound,
  shownGroup,
  onRoundSelect,
  onGroupSelect
}: FifaTournamentStructureNavProps) {
  const groups = tournament.groups
    ? [...tournament.groups].sort((g1, g2) => g1.order - g2.order)
    : void 0;

  const rounds = getNonGroupRounds(tournament.rounds);

  function handleRoundSelect(round: FifaTournamentRoundModel) {
    if (typeof onRoundSelect === 'function') {
      onRoundSelect(round);
    }
  }

  function handleGroupSelect(group: FifaTournamentGroupModel) {
    if (typeof onGroupSelect === 'function') {
      onGroupSelect(group);
    }
  }

  const groupsNodes = groups
    ? groups.map(group => (
        <Tab
          key={group.id}
          small={true}
          active={shownGroup && shownGroup.id === group.id}
          onClick={() => handleGroupSelect(group)}
        >
          {formatGroupName(group).toUpperCase()}
        </Tab>
      ))
    : null;

  const roundsNodes = rounds.map(round => (
    <Tab
      key={round.id}
      small={true}
      active={shownRound && shownRound.id === round.id}
      onClick={() => handleRoundSelect(round)}
    >
      {formatRoundName(round)}
    </Tab>
  ));

  return (
    <Tabs>
      {groupsNodes}
      {roundsNodes}
    </Tabs>
  );
}
