import React, { ReactNode } from 'react';
import { GoPlus } from 'react-icons/go';
import { CardList, CardListItem } from '../shared/card';
import TeamCreateButton from './TeamCreateButton';
import { UserModel } from '../core/types';
import { TeamModel } from './types';
import TeamCard from './TeamCard';

export interface TeamCardListProps {
  currentUser?: UserModel;
  showAddButton?: boolean;
  teams: TeamModel[];
  renderItemActionsBlock?: (team: TeamModel) => ReactNode;
}

export function TeamCardList({
  teams,
  showAddButton,
  currentUser,
  renderItemActionsBlock
}: TeamCardListProps) {
  return (
    <CardList>
      {showAddButton && (
        <CardListItem>
          <TeamCreateButton data-cy="aut-b-create-team" />
        </CardListItem>
      )}

      {teams.map(team => {
        return (
          <CardListItem key={team.id}>
            <TeamCard
              team={team}
              allowJoin={currentUser && !currentUser.team}
              currentUser={currentUser}
              renderActionsBlock={
                typeof renderItemActionsBlock === 'function'
                  ? () => renderItemActionsBlock(team)
                  : void 0
              }
            />
          </CardListItem>
        );
      })}
    </CardList>
  );
}

export default TeamCardList;
