import React from 'react';
import {
  CardContentSublabels,
  CardContentSublabel,
  CardContentMeta
} from '../shared/card';
import { UserModel } from '../core/types';
import { getPersonAge } from '../shared/dateTimeHelpers';

export interface PlayerCardMetaProps {
  player: UserModel;
  detailsLayout?: boolean;
}

export function PlayerCardMeta({ player, detailsLayout }: PlayerCardMetaProps) {
  const playerAge = getPersonAge(player.createdAt);

  return (
    <CardContentMeta>
      <CardContentSublabels alignCenter={!detailsLayout}>
        <CardContentSublabel>@{player.username}</CardContentSublabel>

        {detailsLayout && playerAge && (
          <CardContentSublabel>Established: {playerAge.age === 1 ? `${playerAge.age} ${playerAge.unit}` : `${playerAge.age} ${playerAge.unit}s`} ago</CardContentSublabel>
        )}
      </CardContentSublabels>
    </CardContentMeta>
  );
}
