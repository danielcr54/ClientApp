import React, { Fragment } from 'react';
import { ButtonNavLink, ModalAlertDialog } from '@igg/common';
import {
  Card,
  CardContent,
  CardSection,
  CardMainSection,
  CardContentCell,
  CardMessage,
  CardContentFigure,
  CardTitle,
  CardHeader,
  CardHeaderCell,
  CardHighlightText,
  CardMessageNote
} from '../../shared/card';
import {
  getErrorMessage,
  resolveGraphQLSubmitErrors
} from '../../shared/errorHelpers';
import { TimeLeftLabel } from '../../shared/TimeLeftLabel';
import { UserAvatar } from '../../shared/UserAvatar';
import { UserModel } from '../../core/types';
import { PlayerCardMeta } from '../../players/PlayerCardMeta';
import { MarkAsReadyForFifaMatchMutation } from '../data/MarkAsReadyForFifaMatchMutation';
import { FIFA_TOURNAMENT_DETAILS_QUERY } from '../data/FifaTournamentDetailsQuery';
import { FifaMatchModel } from '../types';
import { MatchTimeNote, MatchTimeNoteMessage } from '../tournamentsElements';
import {
  canBeReadyForMatch,
  isPlayerReadyForMatch,
  isMatchInProgress,
  getMatchMarkAsReadyDeadline
} from '../tournamentHelpers';
import { MarkAsReadyForFifaMatchForm } from './MarkAsReadyForFifaMatchForm';

// Helpers

function renderOpponentStatusLabel(
  player: UserModel | undefined,
  _canBeReady?: boolean,
  isReady?: boolean
) {
  if (!player) return 'Waiting for the opponent to get assigned';
  if (!_canBeReady) return null;
  return isReady
    ? 'Opponent player is ready!'
    : 'Opponent player is not ready yet';
}

function renderOpponentStatusSection(
  player: UserModel | undefined,
  _canBeReady?: boolean,
  isReady?: boolean
) {
  const statusLabel = renderOpponentStatusLabel(player, _canBeReady, isReady);
  if (!statusLabel) return null;

  return (
    <CardSection borderTop={true}>
      <CardContent>
        <CardContentCell main={true}>
          <CardMessage alignCenter={true}>{statusLabel}</CardMessage>
        </CardContentCell>
      </CardContent>
    </CardSection>
  );
}

// TODO: Create special wrapping components for these
function renderOpponentConsolesNames(
  player: UserModel | undefined,
  consoleIds?: string[]
) {
  if (!consoleIds || !consoleIds.length || !player) return null;
  const {
    profile: { xboxUsername, psnUsername }
  } = player;

  return consoleIds.map(consoleId => {
    return (
      <Fragment key={consoleId}>
        {consoleId === 'ps4' && psnUsername && (
          <div>
            PSN username: <strong>{psnUsername}</strong>
          </div>
        )}

        {consoleId === 'xbox' && xboxUsername && (
          <div>
            XBOX gamertag: <strong>{xboxUsername}</strong>
          </div>
        )}
      </Fragment>
    );
  });
}

// Exported component

export interface FifaMatchPlayerActionCardProps {
  tournamentUrlSlug: string;
  consoleIds?: string[];
  match: FifaMatchModel;
  player?: UserModel;
  isOpponent?: boolean;
}

export function FifaMatchPlayerActionCard({
  tournamentUrlSlug,
  consoleIds,
  match,
  player,
  isOpponent
}: FifaMatchPlayerActionCardProps) {
  const isMatchStartTimeSet = !!match.kickoffTime;
  const _canBeReady = canBeReadyForMatch(match, player);
  const isReady = isPlayerReadyForMatch(match, player);

  return (
    <Card faded={true}>
      <CardHeader>
        <CardHeaderCell main={true} />
        <CardHeaderCell>
          {isOpponent ? (
            !!player && (
              <ButtonNavLink
                to={`/players/${player.username}`}
                small={true}
                inverse={true}
              >
                View Player
              </ButtonNavLink>
            )
          ) : (
            <CardHighlightText>Single Player Match</CardHighlightText>
          )}
        </CardHeaderCell>
      </CardHeader>

      <CardMainSection>
        <CardContent forceHorizontal={true} padding={20} paddingTop={0}>
          <CardContentCell verticalSpacing={20}>
            <CardContentFigure>
              <UserAvatar user={player} size={50} />
            </CardContentFigure>
          </CardContentCell>

          <CardContentCell
            main={true}
            verticalSpacing={20}
            verticalAlignCenter={true}
          >
            <CardTitle alignLeft={true} size={22} bold={true}>
              {(player && player.displayName) || 'Undefined Player'}
            </CardTitle>

            {!!player && (
              <PlayerCardMeta player={player} detailsLayout={true} />
            )}

            {isOpponent &&
              player &&
              renderOpponentConsolesNames(player, consoleIds)}
          </CardContentCell>
        </CardContent>
      </CardMainSection>

      {!isOpponent
        ? player &&
          (_canBeReady || isReady ? (
            <CardMainSection>
              <CardContent forceHorizontal={true}>
                <CardContentCell
                  main={true}
                  stretch={true}
                  forceAlignStart={true}
                >
                  {isMatchInProgress(match) ? (
                    <MatchTimeNote>
                      <MatchTimeNoteMessage>
                        You have to mark yourself as ready in
                      </MatchTimeNoteMessage>
                      <TimeLeftLabel
                        untilTime={getMatchMarkAsReadyDeadline(match)}
                      />
                    </MatchTimeNote>
                  ) : (
                    <MatchTimeNote>
                      <MatchTimeNoteMessage>
                        Match is about to start
                      </MatchTimeNoteMessage>
                      <TimeLeftLabel untilTime={match.kickoffTime} />
                    </MatchTimeNote>
                  )}

                  <ModalAlertDialog>
                    {({ open: alert }) => (
                      <MarkAsReadyForFifaMatchMutation
                        onError={error => alert(getErrorMessage(error))}
                      >
                        {(
                          markAsReadyForFifaMatch,
                          { loading, data, error }
                        ) => (
                          <MarkAsReadyForFifaMatchForm
                            onSubmit={formModel =>
                              markAsReadyForFifaMatch({
                                variables: {
                                  input: {
                                    matchId: match.id,
                                    playerId: player.id,
                                    streamUrl: formModel.streamUrl
                                  }
                                },
                                refetchQueries: [
                                  {
                                    query: FIFA_TOURNAMENT_DETAILS_QUERY,
                                    variables: { urlSlug: tournamentUrlSlug }
                                  }
                                ]
                              }).catch(resolveGraphQLSubmitErrors)
                            }
                            success={
                              isReady ||
                              (data && !!data.markAsReadyForFifaMatch)
                            }
                            inProgress={loading}
                          />
                        )}
                      </MarkAsReadyForFifaMatchMutation>
                    )}
                  </ModalAlertDialog>
                </CardContentCell>
              </CardContent>
            </CardMainSection>
          ) : (
            <CardSection borderTop={true}>
              <CardContent>
                <CardContentCell main={true}>
                  {isMatchStartTimeSet ? (
                    <CardMessage alignCenter={true} hasSpacing={false}>
                      The match will start in{' '}
                      <TimeLeftLabel untilTime={match.kickoffTime} />
                      <CardMessageNote>
                        Don't be late for the game!
                      </CardMessageNote>
                    </CardMessage>
                  ) : (
                    <CardMessage alignCenter={true}>
                      Specific match time will be set soon
                    </CardMessage>
                  )}
                </CardContentCell>
              </CardContent>
            </CardSection>
          ))
        : renderOpponentStatusSection(player, _canBeReady, isReady)}
    </Card>
  );
}
