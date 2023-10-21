import React, { Fragment } from 'react';
import {
  FifaTournamentModel,
  FifaTournamentRoundModel,
  FifaTournamentGroupModel,
  FifaMatchModel,
  FifaMatchStatus
} from '../types';
import {
  TreeLayer,
  TreeLayerCell,
  TreeNode,
  TreeConnection,
  TreeConnectionLine,
  TreeConnectionSplitter,
  TreeConnectionSplitterBlock,
  TreeConnectionSplitterLine
} from './fifaTournamentTreeViewElements';
import {
  getRegularRounds,
  getGroupMatches,
  isFutureMatch,
  getRoundMatches,
  isTeamTournament
} from '../tournamentHelpers';
import { renderNoMatchData } from './FifaTournamentStructurePlainView';
import { FifaMatchParticipantMediaObject } from './FifaMatchParticipantMediaObject';
import { FifaMatchTimeScoreLabel } from './FifaMatchTimeScoreLabel';

// NOTE: Assuming rounds to be pre-sorted by the `order` property
// (otherwise, implement sorting here)
// NOTE: Last round(s) goes first (its the baseline we start building upon),
// so we reverse the array
interface LayeredMatchesModel {
  nonAllocatedMatches: FifaMatchModel[];
  prevLayerMatchIdIndexes: { [matchId: string]: number } | undefined;
  layeredMatches: FifaMatchModel[][];
}

function makeLayeredMatches(
  rounds: FifaTournamentRoundModel[],
  allMatches: FifaMatchModel[]
) {
  const _rounds = rounds.length > 1 ? rounds.slice().reverse() : rounds;

  const { layeredMatches } = _rounds.reduce(
    (prev: LayeredMatchesModel, currentRound) => {
      const currentLayerMatches = prev.nonAllocatedMatches.filter(
        m => m.roundId === currentRound.id
      );

      const { prevLayerMatchIdIndexes } = prev;

      if (prevLayerMatchIdIndexes) {
        currentLayerMatches.sort((m1, m2) => {
          if (m1.nextMatchId === m2.nextMatchId) return 0;
          if (!m1.nextMatchId) return -1;
          if (!m2.nextMatchId) return 1;

          return (
            prevLayerMatchIdIndexes[m1.nextMatchId] -
            prevLayerMatchIdIndexes[m2.nextMatchId]
          );
        });
      }

      return {
        nonAllocatedMatches: prev.nonAllocatedMatches.filter(
          m => !currentLayerMatches.includes(m)
        ),
        prevLayerMatchIdIndexes: currentLayerMatches.reduce(
          (acc, current, currentIndex) => ({
            ...acc,
            [current.id]: currentIndex
          }),
          {}
        ),
        layeredMatches: [...prev.layeredMatches, currentLayerMatches]
      };
    },
    {
      nonAllocatedMatches: allMatches,
      prevLayerMatchIdIndexes: void 0,
      layeredMatches: []
    }
  );

  return layeredMatches;
}

function renderLayeredMatches(
  layeredMatches: FifaMatchModel[][],
  _isTeamTournament: boolean
) {
  return layeredMatches.map((layer, index) => (
    <TreeLayer key={index}>
      {layer.map(match => {
        const isWinnerDefined = _isTeamTournament
          ? !!match.winnerTeamId
          : !!match.winnerId;

        const isAnyParticipantDefined = _isTeamTournament
          ? !!match.homeTeamId || !!match.awayTeamId
          : !!match.homePlayerId || !!match.awayPlayerId;

        const _isFutureMatch = isFutureMatch(match);
        const hideTimeScoreLabel = match.status === FifaMatchStatus.CANCELLED;

        return (
          <TreeLayerCell key={match.id}>
            <TreeNode>
              {isWinnerDefined ? (
                <FifaMatchParticipantMediaObject
                  vertical={true}
                  figureOnly={true}
                  player={match.winner}
                  team={match.winnerTeam}
                  isTeam={_isTeamTournament}
                  isWinner={isWinnerDefined}
                />
              ) : isAnyParticipantDefined ? (
                <>
                  <FifaMatchParticipantMediaObject
                    vertical={true}
                    figureOnly={true}
                    player={match.homePlayer}
                    team={match.homeTeam}
                    isTeam={_isTeamTournament}
                    dashedBorder={_isFutureMatch}
                  />
                  <FifaMatchParticipantMediaObject
                    vertical={true}
                    figureOnly={true}
                    player={match.awayPlayer}
                    team={match.awayTeam}
                    isTeam={_isTeamTournament}
                    dashedBorder={_isFutureMatch}
                  />
                </>
              ) : (
                <FifaMatchParticipantMediaObject
                  vertical={true}
                  figureOnly={true}
                  isTeam={_isTeamTournament}
                />
              )}
            </TreeNode>

            <TreeConnection>
              <TreeConnectionLine />
              <TreeConnectionSplitter>
                {!hideTimeScoreLabel && (
                  <TreeConnectionSplitterBlock>
                    <FifaMatchTimeScoreLabel match={match} />
                  </TreeConnectionSplitterBlock>
                )}
                <TreeConnectionSplitterLine />
              </TreeConnectionSplitter>
            </TreeConnection>
          </TreeLayerCell>
        );
      })}
    </TreeLayer>
  ));
}

function renderPlayersRow(
  layeredMatches: FifaMatchModel[][],
  _isTeamTournament: boolean
) {
  return (
    <TreeLayer>
      {layeredMatches[layeredMatches.length - 1].map(firstLayerMatch => (
        <Fragment key={firstLayerMatch.id}>
          {/* Home player */}
          <TreeLayerCell>
            <TreeNode>
              <FifaMatchParticipantMediaObject
                vertical={true}
                player={firstLayerMatch.homePlayer}
                team={firstLayerMatch.homeTeam}
                isTeam={_isTeamTournament}
                isWinner={
                  _isTeamTournament
                    ? !!firstLayerMatch.homeTeamId &&
                      firstLayerMatch.homeTeamId ===
                        firstLayerMatch.winnerTeamId
                    : !!firstLayerMatch.homePlayerId &&
                      firstLayerMatch.homePlayerId === firstLayerMatch.winnerId
                }
              />
            </TreeNode>
          </TreeLayerCell>

          {/* Away player */}
          <TreeLayerCell>
            <TreeNode>
              <FifaMatchParticipantMediaObject
                vertical={true}
                player={firstLayerMatch.awayPlayer}
                team={firstLayerMatch.awayTeam}
                isTeam={_isTeamTournament}
                isWinner={
                  _isTeamTournament
                    ? !!firstLayerMatch.awayTeamId &&
                      firstLayerMatch.awayTeamId ===
                        firstLayerMatch.winnerTeamId
                    : !!firstLayerMatch.awayPlayerId &&
                      firstLayerMatch.awayPlayerId === firstLayerMatch.winnerId
                }
              />
            </TreeNode>
          </TreeLayerCell>
        </Fragment>
      ))}
    </TreeLayer>
  );
}

function renderTree(
  rounds: FifaTournamentRoundModel[],
  matches: FifaMatchModel[],
  _isTeamTournament: boolean
) {
  const layeredMatches = makeLayeredMatches(rounds, matches);

  return (
    <>
      {renderLayeredMatches(layeredMatches, _isTeamTournament)}
      {renderPlayersRow(layeredMatches, _isTeamTournament)}
    </>
  );
}

export interface FifaTournamentStructureTreeViewProps {
  tournament: FifaTournamentModel;
  round?: FifaTournamentRoundModel;
  group?: FifaTournamentGroupModel;
}

export function FifaTournamentStructureTreeView({
  tournament,
  round,
  group
}: FifaTournamentStructureTreeViewProps) {
  // TODO: Prevent repetition between this and "plain-view" component
  // by abstracting the common pieces to the upper-level component

  const _isTeamTournament = isTeamTournament(tournament);

  if (round) {
    const roundMatches = getRoundMatches(tournament, round.id);
    if (!roundMatches || !roundMatches.length) {
      return renderNoMatchData();
    }

    return renderTree([round], roundMatches, _isTeamTournament);
  }

  if (!group) return renderNoMatchData();

  const groupRounds = getRegularRounds(tournament.rounds);
  if (!groupRounds || !groupRounds.length) return renderNoMatchData();

  const groupMatches = getGroupMatches(tournament, group.id);
  if (!groupMatches || !groupMatches.length) return renderNoMatchData();

  return renderTree(groupRounds, groupMatches, _isTeamTournament);
}
