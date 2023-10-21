import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { TeamLogo } from '../../teams/TeamLogo';
import { TeamModel } from '../../teams/types';
import { UserModel } from '../../core/types';
import { UserAvatar } from '../../shared/UserAvatar';

const { colors } = styleSettings;

// Specialized media object component to show team/player logo
// and name in a small block for `FifaMatchCard` and tree-view nodes.

interface FifaMatchParticipantMediaObjectStyledProps {
  vertical?: boolean;
  figureOnly?: boolean;
  unknown?: boolean;
  isWinner?: boolean;
  dashedBorder?: boolean;
}

const FifaMatchParticipantMediaObjectRoot = styled('div')(
  ({
    isWinner,
    unknown,
    vertical,
    figureOnly,
    dashedBorder
  }: FifaMatchParticipantMediaObjectStyledProps) => ({
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: vertical ? 'center' : 'flex-start',
    width: '100%',
    minWidth: vertical ? 49 : 'auto',
    height: vertical && !figureOnly ? 140 : 'auto',
    minHeight: 49,
    padding: 9,
    borderWidth: 1,
    borderStyle: unknown || dashedBorder ? 'dashed' : 'solid',
    borderColor: isWinner
      ? '#2a614d'
      : unknown || dashedBorder
      ? 'rgba(255, 255, 255, 0.55)'
      : 'rgba(255, 255, 255, 0.1)',
    backgroundColor: isWinner
      ? 'rgba(42, 97, 77, 0.2)'
      : unknown || dashedBorder
      ? 'transparent'
      : colors.fadedLighterDark,

    '&:first-of-type': vertical
      ? {
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,

          '&:not(:last-of-type)': {
            borderRightWidth: 0
          }
        }
      : {
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,

          '&:not(:last-of-type)': {
            borderBottomWidth: 0
          }
        },

    '&:last-of-type': vertical
      ? {
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2
        }
      : {
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2
        }
  })
);

const FifaMatchParticipantMediaObjectFigure = styled('div')(
  ({ vertical }: FifaMatchParticipantMediaObjectStyledProps) => ({
    '&:not(:last-of-type)': {
      marginRight: vertical ? 0 : 10,
      marginBottom: vertical ? 10 : 0
    }
  })
);

const FifaMatchParticipantMediaObjectText = styled('div')(
  ({ vertical }: FifaMatchParticipantMediaObjectStyledProps) => ({
    flex: 1,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
);

// Exported component

export interface FifaMatchParticipantMediaObjectProps {
  player?: UserModel;
  team?: TeamModel;
  isTeam?: boolean;
  isWinner?: boolean;
  vertical?: boolean;
  figureOnly?: boolean;
  dashedBorder?: boolean;
}

export function FifaMatchParticipantMediaObject({
  isTeam,
  player,
  team,
  isWinner,
  vertical,
  figureOnly,
  dashedBorder
}: FifaMatchParticipantMediaObjectProps) {
  const imageNode = isTeam ? (
    <TeamLogo team={team} size={29} />
  ) : (
    <UserAvatar user={player} size={29} dark={false} />
  );

  const defaultCaption = 'To be set';
  const caption = isTeam
    ? team
      ? team.name
      : defaultCaption
    : player
    ? player.displayName || player.username
    : defaultCaption;

  return (
    <FifaMatchParticipantMediaObjectRoot
      isWinner={isWinner}
      unknown={isTeam ? !team : !player}
      vertical={vertical}
      figureOnly={figureOnly}
      dashedBorder={dashedBorder}
    >
      <FifaMatchParticipantMediaObjectFigure vertical={vertical}>
        {imageNode}
      </FifaMatchParticipantMediaObjectFigure>

      {!figureOnly && (
        <FifaMatchParticipantMediaObjectText vertical={vertical}>
          {caption}
        </FifaMatchParticipantMediaObjectText>
      )}
    </FifaMatchParticipantMediaObjectRoot>
  );
}
