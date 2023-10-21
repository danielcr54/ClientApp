import React, { ReactNode } from 'react';
import { CardList, CardListItem } from '../shared/card';
import { UserModel } from '../core/types';
import PlayerCard from './PlayerCard';

export interface PlayerCardListProps {
  isOwnerView?: boolean;
  players: UserModel[];
  currentUser?: UserModel;
  renderItemActionsBlock?: (player: UserModel) => ReactNode;
}

export function PlayerCardList({
  isOwnerView,
  players,
  currentUser,
  renderItemActionsBlock
}: PlayerCardListProps) {
  return (
    <CardList>
      {players.map(player => (
        <CardListItem key={player.id}>
          <PlayerCard
            isOwnerView={isOwnerView}
            player={player}
            currentUser={currentUser}
            renderActionsBlock={
              typeof renderItemActionsBlock === 'function'
                ? () => renderItemActionsBlock(player)
                : void 0
            }
          />
        </CardListItem>
      ))}
    </CardList>
  );
}

export default PlayerCardList;
