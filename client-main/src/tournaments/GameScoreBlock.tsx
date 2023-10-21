import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Media from 'react-media';
import { styleSettings } from '@igg/common';
import { TeamMediaObject } from '../teams/TeamMediaObject';
import { TeamModel } from '../teams/types';
import { UserModel } from '../core/types';
import PlayerMediaObject from '../players/PlayerMediaObject';

const { deviceScreenQuery } = styleSettings;

// Styled helpers

export interface GameScoreBlockStyledProps {
  isFirst?: boolean;
  isLast?: boolean;
  large?: boolean;
  highlighted?: boolean;
  clickable?: boolean;
}

const GameScoreBlockRoot = styled('div')(
  ({ highlighted, clickable }: GameScoreBlockStyledProps) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: clickable ? 'pointer' : 'default',
    backgroundColor: highlighted ? 'rgba(255, 255, 255, 0.1)' : 'transparent',

    '&:hover': {
      backgroundColor:
        clickable || highlighted ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
    },

    '&:first-of-type': {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2
    },

    '&:last-of-type': {
      borderTopRifghtRadius: 2,
      borderBottomRifghtRadius: 2
    }
  })
);

const GameScoreBlockContent = styled('span')({
  flex: 1
});

const GameScoreBlockValue = styled('span')(
  ({ large }: GameScoreBlockStyledProps) => ({
    padding: 10,
    fontSize: 22,
    fontWeight: 500,
    color: 'white',
    textAlign: 'right',

    [`@media ${deviceScreenQuery.medium}`]: {
      fontSize: large ? 35 : 22
    }
  })
);

export interface GameScoreBlockGroupProps {
  vertical?: boolean;
}

export const GameScoreBlockGroup = styled('div')(
  ({ vertical }: GameScoreBlockGroupProps) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& > *:not(:last-of-type)': {
      borderBottomWidth: 0
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      flexDirection: vertical ? 'column' : 'row',

      '& > *:not(:last-of-type)': {
        borderBottomWidth: vertical ? 0 : 1,
        borderRightWidth: vertical ? 1 : 0
      }
    }
  }),
  ({ vertical }: GameScoreBlockGroupProps) => {
    if (vertical) {
      return {
        flex: 1,

        '& > *': {
          flex: 1
        }
      };
    }

    return {};
  }
);

// Exported component

export interface GameScoreBlockProps {
  player?: UserModel;
  team?: TeamModel;
  isTeam?: boolean;
  score?: number;
  large?: boolean;
  clickable?: boolean;
  highlighted?: boolean;
  renderScoreValueBlock?: () => ReactNode;
  onClick?: () => void;
}

export function GameScoreBlock({
  player,
  team,
  isTeam,
  score,
  large,
  clickable,
  highlighted,
  renderScoreValueBlock,
  onClick
}: GameScoreBlockProps) {
  return (
    <GameScoreBlockRoot
      clickable={clickable}
      highlighted={highlighted}
      onClick={onClick}
    >
      <GameScoreBlockContent>
        <Media query={deviceScreenQuery.medium}>
          {matches =>
            isTeam ? (
              <TeamMediaObject
                team={team}
                textSize={matches ? 22 : void 0}
                logoSize={matches ? 50 : void 0}
              />
            ) : (
              <PlayerMediaObject
                player={player}
                textSize={matches ? 22 : void 0}
                imageSize={matches ? 50 : void 0}
                boldLabel={true}
              />
            )
          }
        </Media>
      </GameScoreBlockContent>

      {typeof renderScoreValueBlock === 'function' ? (
        renderScoreValueBlock()
      ) : (
        <GameScoreBlockValue large={large}>{score || 0}</GameScoreBlockValue>
      )}
    </GameScoreBlockRoot>
  );
}
