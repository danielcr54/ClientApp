import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { UserModel } from '../core/types';
import { UserAvatar } from '../shared/UserAvatar';

const { colors } = styleSettings;

// A component with a logo and a title

// Elements (to be extracted out maybe)

const PlayerMediaObjectRoot = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch'
});

const PlayerMediaObjectFigure = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12
});

const PlayerMediaObjectBody = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

const PlayerMediaObjectActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

interface PlayerNameProps {
  large?: boolean;
  size?: number;
  bold?: boolean;
}

const PlayerName = styled('span')(({ size, large, bold }: PlayerNameProps) => ({
  fontSize: size ? size : large ? 20 : 15,
  fontWeight: bold ? 500 : 400,
  color: 'white',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none'
  }
}));

const PlayerSublabel = styled('span')({
  fontWeight: 400,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.5)'
});

interface PlayerStatusLabelProps {
  success?: boolean;
}

const PlayerStatusLabel = styled('span')(
  ({ success }: PlayerStatusLabelProps) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: '2px 6px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: success ? '#2a614d' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    fontSize: 13,
    backgroundColor: success
      ? 'rgba(42, 97, 77, 0.2)'
      : colors.fadedLighterDark,
    color: 'rgba(255, 255, 255, 0.55)'
  })
);

// Exported component

export interface PlayerMediaObjectProps {
  player?: UserModel;
  isCurrentUser?: boolean;
  showTeamRole?: boolean;
  noPlayerLabel?: string;
  imageSize?: number;
  textSize?: number;
  boldLabel?: boolean;
  statusLabel?: string;
  statusLabelSuccess?: boolean;
  renderActionsBlock?: () => ReactNode;
}

export function PlayerMediaObject({
  player,
  isCurrentUser,
  noPlayerLabel,
  showTeamRole,
  imageSize,
  textSize,
  boldLabel,
  statusLabel,
  statusLabelSuccess,
  renderActionsBlock
}: PlayerMediaObjectProps) {
  return (
    <PlayerMediaObjectRoot>
      <PlayerMediaObjectFigure>
        <UserAvatar size={imageSize || 32} user={player} />
      </PlayerMediaObjectFigure>

      <PlayerMediaObjectBody>
        <PlayerName size={textSize || 15} bold={boldLabel}>
          {player ? player.displayName : noPlayerLabel || 'Undefined Player'}{' '}
          {player &&
            (isCurrentUser ? (
              <PlayerSublabel>You</PlayerSublabel>
            ) : (
              showTeamRole &&
              player.teamRole && (
                <PlayerSublabel>{player.teamRole}</PlayerSublabel>
              )
            ))}
          {statusLabel && (
            <PlayerStatusLabel success={statusLabelSuccess}>
              {statusLabel}
            </PlayerStatusLabel>
          )}
        </PlayerName>
      </PlayerMediaObjectBody>

      {typeof renderActionsBlock === 'function' && (
        <PlayerMediaObjectActions>
          {renderActionsBlock()}
        </PlayerMediaObjectActions>
      )}
    </PlayerMediaObjectRoot>
  );
}

export default PlayerMediaObject;
