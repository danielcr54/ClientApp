import React from 'react';
import {
  Card,
  CardContent,
  CardContentCell,
  CardSection
} from '../../shared/card';
import { UserModel } from '../../core/types';
import {
  FifaMatchModel,
  FifaMatchStatus,
  FifaMatchParticipantStatus,
  TournamentRoundType
} from '../types';
import { GameScoreBlock, GameScoreBlockGroup } from '../GameScoreBlock';
import { MatchResultMessage } from '../MatchResultsMessage';
import {
  resolveMatchPlayers,
  resolveMatchScoreSubmission,
  areMatchScoresDefined,
  resolveMatchScores,
  resolveMatchPlayerStatuses
} from '../tournamentHelpers';
import {
  DisputeIcon,
  MatchSuccessIcon,
  MatchFailureIcon,
  DisqualifiedIcon
} from '@igg/common/lib';

export interface EndedFifaMatchMessagePaneProps {
  match: FifaMatchModel;
  isTeamMatch?: boolean;
  currentUser: UserModel;
}

export function EndedFifaMatchMessagePane({
  match,
  isTeamMatch,
  currentUser
}: EndedFifaMatchMessagePaneProps) {
  const { player, opponentPlayer } = resolveMatchPlayers(match, currentUser);
  const { playerStatus, opponentStatus } = resolveMatchPlayerStatuses(
    match,
    currentUser
  );
  const { ownScore, opponentScore } = areMatchScoresDefined(match)
    ? resolveMatchScores(match, player, isTeamMatch)
    : resolveMatchScoreSubmission(match, currentUser, isTeamMatch) || {
        ownScore: 0,
        opponentScore: 0
      };

  const isUserWinner = isTeamMatch
    ? !!match.winnerTeamId &&
      !!player &&
      !!player.team &&
      match.winnerTeamId === player.team.id
    : !!match.winnerId && !!player && match.winnerId === player.id;

  const isUserDisqualified =
    playerStatus === FifaMatchParticipantStatus.DISQUALIFIED;

  const areBothDisqualified =
    isUserDisqualified &&
    opponentStatus === FifaMatchParticipantStatus.DISQUALIFIED;

  const isFinalMatch =
    match.round && match.round.type === TournamentRoundType.FINAL;

  return (
    <Card faded={true}>
      <CardSection>
        <CardContent>
          <CardContentCell main={true}>
            <GameScoreBlockGroup>
              <GameScoreBlock
                player={player}
                isTeam={isTeamMatch}
                score={ownScore}
              />

              <GameScoreBlock
                player={opponentPlayer}
                isTeam={isTeamMatch}
                score={opponentScore}
              />
            </GameScoreBlockGroup>
          </CardContentCell>
        </CardContent>
      </CardSection>

      <CardSection>
        <CardContent>
          <CardContentCell main={true}>
            {match.status === FifaMatchStatus.CANCELLED && (
              <MatchResultMessage
                icon={<DisqualifiedIcon />}
                text={
                  areBothDisqualified
                    ? 'Both parties have been disqualified'
                    : isUserDisqualified
                    ? "Sorry, you've been disqualified!"
                    : 'This match has been cancelled.'
                }
              />
            )}

            {match.status === FifaMatchStatus.DID_NOT_FINISH && (
              <MatchResultMessage
                icon={<DisqualifiedIcon />}
                text="This match is considered non-finished."
              />
            )}

            {match.status === FifaMatchStatus.DISPUTE && (
              <MatchResultMessage
                icon={<DisputeIcon />}
                text="There has been a conflict in the match result. Our team will check it and get back to you as soon as possible."
              />
            )}

            {(match.status === FifaMatchStatus.COMPLETED ||
              match.status === FifaMatchStatus.VERIFIED) &&
              (isUserWinner ? (
                <MatchResultMessage
                  icon={<MatchSuccessIcon />}
                  text={`Congratulations! ${
                    isFinalMatch
                      ? 'Thank you for participating!'
                      : "We'll let you know once your next match is about to start."
                  }`}
                />
              ) : (
                <MatchResultMessage
                  icon={<MatchFailureIcon />}
                  text="Thank you for joining the tournament. Check back again for more and good luck!"
                />
              ))}
          </CardContentCell>
        </CardContent>
      </CardSection>
    </Card>
  );
}
