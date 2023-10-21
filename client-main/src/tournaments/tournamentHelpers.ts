import { DateTime, Interval } from 'luxon';
import { UserModel, GameMode } from '../core/types';
import { TeamModel } from '../teams/types';
import {
  FifaTournamentModel,
  FifaTournamentRoundModel,
  TournamentRoundType,
  FifaMatchModel,
  FifaTournamentGroupModel,
  FifaMatchStatus,
  FifaMatchParticipantStatus,
  FifaMatchDisputeReason,
  TournamentPrizeType,
  TournamentPrizeModel
} from './types';
import { placeholderCSS } from 'react-select/lib/components/Placeholder';

// TODO: Move game-mode related stuff to `shared` instead

const gameModeLabels = {
  [GameMode.ULTIMATE_TEAM]: 'Ultimate Team',
  [GameMode.PRO_CLUBS]: 'Pro Clubs'
};

export function gameModeLabel(gameMode: GameMode) {
  return gameModeLabels[gameMode] || 'Unknown';
}

const fifaMatchDisputeReasonLabels = {
  [FifaMatchDisputeReason.GUEST_ADDED]: 'Guest added',
  [FifaMatchDisputeReason.CUSTOM_TEAM]: 'Custom team',
  [FifaMatchDisputeReason.CANT_FIND_GAMERTAG]: "Can't find gamertag",
  [FifaMatchDisputeReason.INCORRECT_GAMERTAG]: 'Incorrect gamertag',
  [FifaMatchDisputeReason.UNRESPONSIVE_OPPONENT]: 'Unresponsive opponent',
  [FifaMatchDisputeReason.DISCONNECTED_MATCH]: 'Disconnected match',
  [FifaMatchDisputeReason.OPPONENT_DIDNT_REMATCH]: "Opponent didn't rematch",
  [FifaMatchDisputeReason.INCORRECT_GAMEMODE]: 'Incorrect game mode',
  [FifaMatchDisputeReason.INCONSISTENT_SCORE]: 'Inconsistent score',
  [FifaMatchDisputeReason.NO_SCORE_SUBMITTED]: 'No score submitted'
};

export function getFifaMatchDisputeReasonLabel(
  disputeReason: FifaMatchDisputeReason
) {
  return fifaMatchDisputeReasonLabels[disputeReason] || 'Unknown';
}

export function isTournamentParticipant(
  tournament?: FifaTournamentModel,
  user?: UserModel
) {
  if (!tournament || !user) return false;
  return tournament.players.some(p => p.id === user.id);
}

export function isTeamTournament(tournament: FifaTournamentModel) {
  return (tournament.teamSize && tournament.teamSize > 1) || false;
}

export function formatTournamentPlayerCount(tournament: FifaTournamentModel) {
  const { players, maxPlayers } = tournament;
  const playersJoined = (players && players.length) || 0;
  const isPlural =
    (maxPlayers || playersJoined) > 1 || (maxPlayers || playersJoined) < 1;

  return `${playersJoined}${maxPlayers ? ' / ' + maxPlayers : ''} Player${
    isPlural ? 's' : ''
  }`;
}

export function formatRoundTimeString(startDate: Date, endDate: Date) {
  const startDateTime = DateTime.fromJSDate(startDate, { locale: 'en' });
  const endDateTime = DateTime.fromJSDate(endDate, { locale: 'en' });
  const isSameDay = startDateTime.hasSame(endDateTime, 'day');

  // 'Apr 13 15:00 - 18:00';
  return `${startDateTime.toLocaleString({
    month: 'short',
    day: '2-digit'
  })} ${startDateTime.toLocaleString({
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })} - ${
    isSameDay
      ? ''
      : endDateTime.toLocaleString({
          month: 'short',
          day: '2-digit'
        }) + ' '
  }${endDateTime.toLocaleString({
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })}`;
}

// TODO: Reduce the duplication between this and above
export function formatTimeslotLabel(startDate: Date, endDate: Date) {
  const startDateTime = DateTime.fromJSDate(startDate, { locale: 'en' });
  const endDateTime = DateTime.fromJSDate(endDate, { locale: 'en' });
  const isSameDay = startDateTime.hasSame(endDateTime, 'day');

  return `From ${
    isSameDay
      ? ''
      : startDateTime.toLocaleString({
          month: 'short',
          day: '2-digit'
        }) + ' '
  }${startDateTime.toLocaleString({
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })} till ${
    isSameDay
      ? ''
      : endDateTime.toLocaleString({
          month: 'short',
          day: '2-digit'
        }) + ' '
  }${endDateTime.toLocaleString({
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })}`;
}

// TODO: Probably extract to be more generic date/time helper
export function formatDateTimeLabel(dateTime?: Date, timeOnly?: boolean) {
  if (!dateTime) return '';
  const dateTimeInstance = DateTime.fromJSDate(dateTime, { locale: 'en' });
  if (!dateTimeInstance.isValid) return 'Invalid DateTime';

  const formatCfg = {
    ...((!timeOnly && {
      month: 'short',
      day: '2-digit'
    }) ||
      void 0),
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  };

  return dateTimeInstance.toLocaleString(formatCfg);
}

// TODO: Probably extract to be more generic date/time helper
export function formatTimeLeftLabel(leftUntil?: Date | number) {
  if (!leftUntil) return '[Unknown]';

  const leftUntilDate =
    typeof leftUntil === 'number' ? new Date(leftUntil) : leftUntil;

  const leftUntilDateTime = DateTime.fromJSDate(leftUntilDate, {
    locale: 'en'
  });

  if (!leftUntilDateTime.isValid) return '[Unknown]';
  if (leftUntilDateTime.diffNow().milliseconds <= 0) {
    return '0 seconds';
  }

  const relativeLabel = leftUntilDateTime.toRelative({
    base: DateTime.utc()
  });

  if (!relativeLabel) return '[Unknown]';

  return relativeLabel.startsWith('in ')
    ? relativeLabel.replace('in ', '')
    : relativeLabel;
}

export function shouldAllowJoin(
  tournament: FifaTournamentModel,
  user: UserModel
) {
  if (!tournament || !tournament.rounds || !tournament.rounds.length) {
    return false;
  }

  // Prevent users from joining to the tournament from 1 hour before the start time
  if (
    tournament.startTime &&
    tournament.startTime.getTime() - 60 * 60 * 1000 < Date.now()
  ) {
    return false;
  }

  if (isTournamentParticipant(tournament, user)) return false;

  // Check if the tournament is already full of players
  if (
    tournament.maxPlayers &&
    tournament.players.length >= tournament.maxPlayers
  ) {
    return false;
  }

  return true;
}

export function formatPrizePlaceLabel(place?: number) {
  const places = ['First', 'Second', 'Third'];
  if (place && (place > 0 && place <= places.length)) {
    return `${places[place - 1]} Place Prize`;
  }
  return '';
}

export function getWinnerPrizes(prizes?: TournamentPrizeModel[]) {
  if (!prizes) return [];
  return prizes
    .filter(prize => !!prize.place)
    .sort((prize1, prize2) => (prize1.place || 0) - (prize2.place || 0))
    .filter(prize => prize.type === TournamentPrizeType.TOKEN);
}

export function getPrizePoolData(tournament: FifaTournamentModel) {
  if (!tournament) return [];

  if (tournament.consoleIds.some(consoleId => consoleId === 'ps4')) {
    return [
      {
        id: 'ps4_token_prize',
        name: '6,000,000 IG Gold',
        type: TournamentPrizeType.TOKEN
      },
      {
        id: 'ps4_cash_prize',
        name: '£500',
        type: TournamentPrizeType.CASH
      }
    ];
  }

  if (tournament.consoleIds.some(consoleId => consoleId === 'xbox')) {
    return [
      {
        id: 'xbox_token_prize',
        name: '4,000,000 IG Gold',
        type: TournamentPrizeType.TOKEN
      },
      {
        id: 'xbox_cash_prize',
        name: '£500',
        type: TournamentPrizeType.CASH
      }
    ];
  }

  return [];
}

export function getRegularRounds(rounds?: FifaTournamentRoundModel[]) {
  if (!rounds) return [];
  const excludedTypes = [
    TournamentRoundType.QUARTER_FINAL,
    TournamentRoundType.SEMI_FINAL,
    TournamentRoundType.FINAL,
    TournamentRoundType.LOSERS
  ];

  return rounds.filter(r => !excludedTypes.some(t => t === r.type));
}

export function getNonGroupRounds(rounds?: FifaTournamentRoundModel[]) {
  if (!rounds) return [];
  const includedTypes = [
    TournamentRoundType.QUARTER_FINAL,
    TournamentRoundType.SEMI_FINAL,
    TournamentRoundType.FINAL,
    TournamentRoundType.LOSERS
  ];

  return rounds.filter(r => includedTypes.some(t => t === r.type));
}

export function getRoundMatches(
  tournament: FifaTournamentModel,
  roundId: string
) {
  if (!tournament.matches) return [];
  return tournament.matches.filter(m => m.roundId === roundId);
}

export function getGroupMatches(
  tournament: FifaTournamentModel,
  groupId: string
) {
  if (!tournament.matches) return [];
  return tournament.matches.filter(m => m.groupId === groupId);
}

export function getGroupPlayers(
  tournament: FifaTournamentModel,
  groupId: string
) {
  if (!tournament.players || !tournament.players.length) return [];

  const groupMatches = getGroupMatches(tournament, groupId);
  if (!groupMatches || !groupMatches.length) return [];

  const groupPlayerIds = groupMatches.reduce((playerIdSet, currentMatch) => {
    if (currentMatch.homePlayerId) {
      playerIdSet.add(currentMatch.homePlayerId);
    }

    if (currentMatch.awayPlayerId) {
      playerIdSet.add(currentMatch.awayPlayerId);
    }

    return playerIdSet;
  }, new Set<string>());

  return tournament.players.filter(p => groupPlayerIds.has(p.id));
}

export function getGroupTeams(
  tournament: FifaTournamentModel,
  groupId: string
) {
  if (!tournament.teams || !tournament.teams.length) return [];

  const groupMatches = getGroupMatches(tournament, groupId);
  if (!groupMatches || !groupMatches.length) return [];

  const groupTeamIds = groupMatches.reduce((teamIdSet, currentMatch) => {
    if (currentMatch.homeTeamId) {
      teamIdSet.add(currentMatch.homeTeamId);
    }

    if (currentMatch.awayTeamId) {
      teamIdSet.add(currentMatch.awayTeamId);
    }

    return teamIdSet;
  }, new Set<string>());

  return tournament.teams.filter(p => groupTeamIds.has(p.id));
}

export function getRoundGroupMatches(
  tournament: FifaTournamentModel,
  roundId: string,
  groupId: string
) {
  if (!tournament.matches) return [];
  return tournament.matches.filter(
    m => m.roundId === roundId && m.groupId === groupId
  );
}

export function formatGroupName(group?: FifaTournamentGroupModel) {
  if (!group || !group.order) return '';
  const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const alphabetLength = alphabetArr.length;

  const letterIndex = (group.order - 1) % alphabetLength;
  const letter = alphabetArr[letterIndex];
  const suffixNum = Math.floor((group.order - 1) / alphabetLength);

  return `Group ${letter.toUpperCase()}${suffixNum || ''}`;
}

export function formatRoundName(round?: FifaTournamentRoundModel) {
  if (!round) return '';

  if (round.type === TournamentRoundType.QUARTER_FINAL) {
    return 'Quarter-Final';
  }

  if (round.type === TournamentRoundType.SEMI_FINAL) {
    return 'Semi-Final';
  }

  if (round.type === TournamentRoundType.FINAL) {
    return 'Final Round';
  }

  if (round.type === TournamentRoundType.LOSERS) {
    return 'Play-Off';
  }

  if (round.order) return `Round ${round.order}`;

  return 'Round';
}

export function isFinalRound(round?: FifaTournamentRoundModel) {
  if (!round) return false;
  return round.type === TournamentRoundType.FINAL;
}

export function getFinalRound(tournament: FifaTournamentModel) {
  if (!tournament.rounds) return void 0;
  return tournament.rounds.find(isFinalRound);
}

export function getFinalRoundMatch(tournament: FifaTournamentModel) {
  const finalRound = getFinalRound(tournament);
  if (!finalRound || !tournament.matches || !tournament.matches.length) {
    return void 0;
  }

  return tournament.matches.find(m => m.roundId === finalRound.id);
}

export function isFutureRound(round: FifaTournamentRoundModel) {
  if (!round) return false;
  if (!round.startTime) return true;
  return round.startTime.getTime() > Date.now();
}

export function isPastRound(round: FifaTournamentRoundModel) {
  if (!round || !round.endTime) return false;
  return round.endTime.getTime() <= Date.now();
}

export function isRoundUpcoming(
  round: FifaTournamentRoundModel,
  allRounds: FifaTournamentRoundModel[]
) {
  // NOTE: Assuming allRounds are sorted by startTime
  if (!isFutureRound(round)) return false;
  if (!allRounds || !allRounds.length) {
    return isFutureRound(round);
  }

  const roundIndex = allRounds.findIndex(r => r.id === round.id);
  if (roundIndex === 0) return isFutureRound(round);

  const prevRound = allRounds[roundIndex - 1];
  if (isPastRound(prevRound)) return isFutureRound(round);

  return false;
}

export function isRoundInProgress(round?: FifaTournamentRoundModel) {
  if (!round || !round.startTime || !round.endTime) return false;

  const roundInterval = Interval.fromDateTimes(round.startTime, round.endTime);
  return roundInterval.contains(DateTime.utc());
}

export function isRoundCompleted(round: FifaTournamentRoundModel) {
  if (!round || !round.endTime) return false;
  return Date.now() >= round.endTime.getTime();
}

/**
 * Given an array of all rounds, outputs the N consequent rounds to
 * display as a "blocks" on top of tournament details screen.
 * @param rounds Rounds array to get round information from
 * @param maxRounds Optional. Defines how many rounds to show at max. Defaults to `3`.
 */
export function getShownRounds(
  rounds: FifaTournamentRoundModel[],
  maxRounds: number = 3
) {
  // NOTE: Assuming allRounds are sorted by startTime

  // This needs to return for sure:
  // - Currently upcoming round
  // - Currently active round

  // If possible:
  // - Recently completed round
  // - Next round (after upcoming or in-progress)

  // Note: Prioritize future rounds and show upcoming/in-progress in the "center".
  // If there are 4 max rounds to show, we need to show one completed,
  // one currently in-progress and 2 future ones.

  // Nothing in, nothing out
  if (!rounds || !rounds.length || maxRounds < 1) return [];

  // If there are less rounds than max allowed, show all of them
  if (rounds.length <= maxRounds) return rounds;

  // If no round had started yet, show first `max`
  if (isFutureRound(rounds[0])) return rounds.slice(0, maxRounds);

  // If all have completed, show last `max`
  if (isPastRound(rounds[rounds.length - 1])) return rounds.slice(-maxRounds);

  // Otherwise, things get more interesting :)
  // NOTE that at this point there are more items than allowed to show

  // Find the index of a currently upcoming/in-progress one
  const activeRoundIndex = Math.max(
    rounds.findIndex(r => isRoundInProgress(r) || isRoundUpcoming(r, rounds)),
    0
  );

  // Then find out how many we can show before and after at max
  let showBefore = Math.floor((maxRounds - 1) / 2);
  let showAfter = Math.ceil((maxRounds - 1) / 2);

  const availableBefore = activeRoundIndex;
  const availableAfter = rounds.length - activeRoundIndex;

  // Adjust the previously found max values for before/after based on
  // how many are available on each side
  if (showBefore > availableBefore) {
    showAfter = showAfter + (showBefore - availableBefore);
    showBefore = availableBefore;
  }

  if (showAfter > availableAfter) {
    showBefore = showBefore + (showAfter - availableAfter);
    showBefore = availableAfter;
  }

  // Now that we know how many items we need and we're sure the
  // items are there, lets build up a result array

  const beforeItems = rounds.filter(
    (_, i) => i >= activeRoundIndex - showBefore && i < activeRoundIndex
  );
  const afterItems = rounds.filter(
    (_, i) => i > activeRoundIndex && i <= activeRoundIndex + showAfter
  );

  return [...beforeItems, rounds[activeRoundIndex], ...afterItems];
}

export function isFutureMatch(match: FifaMatchModel) {
  if (!match) return false;
  if (!match.kickoffTime) return true;
  return match.kickoffTime.getTime() > Date.now();
}

export function isPastMatch(match: FifaMatchModel) {
  if (!match || !match.finishTime) return false;
  return match.finishTime.getTime() <= Date.now();
}

export function isMatchInProgress(match: FifaMatchModel) {
  if (!match || !match.kickoffTime || !match.finishTime) return false;

  const matchInterval = Interval.fromDateTimes(
    match.kickoffTime,
    match.finishTime
  );
  return matchInterval.contains(DateTime.utc());
}

export function areMatchTimeSlotsSelectable(
  currentUser: UserModel,
  match: FifaMatchModel
) {
  if (!match || !match.kickoffTime) return false;

  if (match.awayPlayerId === currentUser.id && match.awayTimeSlotIds) {
    return false;
  }

  if (match.homePlayerId === currentUser.id && match.homeTimeSlotIds) {
    return false;
  }

  return true;
}

export function getMissingConsoleIds(
  tournament: FifaTournamentModel,
  user: UserModel
): Array<string | undefined> {
  const { consoleIds } = tournament;
  if (!consoleIds || !consoleIds.length) return [];

  const {
    profile: { psnUsername, xboxUsername }
  } = user;
  const hasNecessaryConsoleIds =
    (consoleIds.includes('ps4') && psnUsername) ||
    (consoleIds.includes('xbox') && xboxUsername);

  return hasNecessaryConsoleIds ? [] : consoleIds;
}

export function getCurrentRound(tournament: FifaTournamentModel) {
  if (!tournament.rounds) return void 0;
  return tournament.rounds.find(isRoundInProgress);
}

export function getActiveRound(tournament: FifaTournamentModel) {
  if (!tournament.rounds) return void 0;

  const currentRound = tournament.rounds.find(isRoundInProgress);
  if (currentRound) return currentRound;

  // Now, if there's no round that is currently in progress,
  // we need to check if there's some upcoming round, so just
  // find the first future round (assuming they're sorted
  // by startTime)
  const firstFutureRound = tournament.rounds.find(isFutureRound);
  if (firstFutureRound) return firstFutureRound;

  // Since there's no in-progress round, nor upcoming one,
  // we consider there's no active round anymore
  return void 0;
}

export function getActiveRoundMatches(tournament: FifaTournamentModel) {
  const { matches } = tournament;
  if (!matches) return void 0;

  const activeRound = getActiveRound(tournament);
  if (!activeRound) return void 0;

  return matches.filter(m => m.roundId === activeRound.id);
}

export function getPlayerActiveMatch(
  tournament: FifaTournamentModel,
  player: UserModel
) {
  const activeRoundMatches = getActiveRoundMatches(tournament);
  if (!activeRoundMatches || !activeRoundMatches.length) return void 0;

  return activeRoundMatches.find(
    r => r.homePlayerId === player.id || r.awayPlayerId === player.id
  );
}

export function resolveMatchPlayers(
  match: FifaMatchModel,
  currentUser: UserModel
) {
  const { homePlayer, awayPlayer } = match;
  return homePlayer && homePlayer.id === currentUser.id
    ? {
        player: homePlayer,
        opponentPlayer: awayPlayer
      }
    : awayPlayer && awayPlayer.id === currentUser.id
    ? { player: awayPlayer, opponentPlayer: homePlayer }
    : { player: void 0, opponentPlayer: void 0 };
}

export function resolveMatchPlayerStatuses(
  match: FifaMatchModel,
  currentUser: UserModel
) {
  const { homePlayer, awayPlayer, homeStatus, awayStatus } = match;
  return homePlayer && homePlayer.id === currentUser.id
    ? {
        playerStatus: homeStatus,
        opponentStatus: awayStatus
      }
    : awayPlayer && awayPlayer.id === currentUser.id
    ? { player: awayStatus, opponentStatus: homeStatus }
    : { playerStatus: void 0, opponentStatus: void 0 };
}

export function resolveMatchTeams(
  match: FifaMatchModel,
  currentUser: UserModel
) {
  // TODO: Find the currentUser's team and the opponent team
  // return {
  //   team: ...,
  //   opponentTeam: ...
  // };
}

export function resolveMatchScoreSubmission(
  match: FifaMatchModel,
  currentUser: UserModel,
  isTeamMatch: boolean = false
) {
  const { homePlayerId, awayPlayerId } = match;

  // TODO: Resolve teams score
  if (isTeamMatch) return void 0;

  return homePlayerId && homePlayerId === currentUser.id
    ? match.homeScoreSubmission
    : awayPlayerId && awayPlayerId === currentUser.id
    ? match.awayScoreSubmission
    : void 0;
}

export function areMatchScoresDefined(match: FifaMatchModel) {
  return (
    typeof match.homeScore !== 'undefined' &&
    typeof match.awayScore !== 'undefined'
  );
}

export function resolveMatchScores(
  match: FifaMatchModel,
  user: UserModel | undefined,
  isTeamMatch: boolean = false
) {
  const noScores = {
    ownScore: 0,
    opponentScore: 0
  };

  if (!user || !areMatchScoresDefined(match)) return noScores;

  const { homePlayerId, awayPlayerId, homeScore, awayScore } = match;

  if (isTeamMatch) {
    // TODO: Resolve teams scores
    return noScores;
  }

  return homePlayerId && homePlayerId === user.id
    ? { ownScore: homeScore, opponentScore: awayScore }
    : awayPlayerId && awayPlayerId === user.id
    ? { ownScore: awayScore, opponentScore: homeScore }
    : noScores;
}

export function hasSubmittedMatchResult(
  match: FifaMatchModel,
  currentUser: UserModel,
  isTeamMatch: boolean = false
) {
  return !!resolveMatchScoreSubmission(match, currentUser, isTeamMatch);
}

export function resolveMatchTimeSlots(
  match: FifaMatchModel,
  currentUser: UserModel,
  isTeamMatch: boolean = false
) {
  const { homePlayerId, awayPlayerId } = match;

  // TODO: Resolve for team the user is possibly a part of
  if (isTeamMatch) return void 0;

  return homePlayerId && homePlayerId === currentUser.id
    ? match.homeTimeSlots
    : awayPlayerId && awayPlayerId === currentUser.id
    ? match.awayTimeSlots
    : void 0;
}

export function isPlayerReadyForMatch(
  match: FifaMatchModel,
  player?: UserModel
) {
  if (!player || (!match.homePlayerId && !match.awayPlayerId)) return false;
  return (
    (match.homePlayerId === player.id &&
      match.homeStatus === FifaMatchParticipantStatus.READY) ||
    (match.awayPlayerId === player.id &&
      match.awayStatus === FifaMatchParticipantStatus.READY)
  );
}

export function isReadyForMatch(
  match: FifaMatchModel,
  user?: UserModel,
  isTeamMatch?: boolean
) {
  // TODO: Handle teams
  if (isTeamMatch) return false;

  return isPlayerReadyForMatch(match, user);
}

export function isMatchMarkAsReadyPeriod(match: FifaMatchModel) {
  if (!match.kickoffTime) return false;

  const kickoffDateTime = DateTime.fromJSDate(match.kickoffTime);
  const joinInterval = Interval.fromDateTimes(
    kickoffDateTime.minus({ minutes: 5 }),
    kickoffDateTime.plus({ minutes: 15 })
  );

  if (!joinInterval.isValid) return false;
  return joinInterval.contains(DateTime.utc());
}

export function getMatchMarkAsReadyDeadline(match: FifaMatchModel) {
  if (!match.kickoffTime) return void 0;

  const kickoffDateTime = DateTime.fromJSDate(match.kickoffTime);
  if (!kickoffDateTime.isValid) return void 0;

  return kickoffDateTime.plus({ minutes: 15 }).toJSDate();
}

export function canPlayerBeReadyForMatch(
  match: FifaMatchModel,
  player?: UserModel
) {
  if (!player) return false;
  if (
    match.status !== FifaMatchStatus.PRE_GAME &&
    match.status !== FifaMatchStatus.IN_GAME
  ) {
    return false;
  }

  if (match.homePlayerId !== player.id && match.awayPlayerId !== player.id) {
    return false;
  }

  if (isPlayerReadyForMatch(match, player)) return false;

  return isMatchMarkAsReadyPeriod(match);
}

export function canTeamBeReadyForMatch(match: FifaMatchModel, team: TeamModel) {
  // TODO
  return false;
}

export function canBeReadyForMatch(
  match: FifaMatchModel,
  user: UserModel | undefined,
  isTeamMatch: boolean = false
) {
  return isTeamMatch
    ? !!user && !!user.team && canTeamBeReadyForMatch(match, user.team)
    : canPlayerBeReadyForMatch(match, user);
}

export function hasPlayerForfeitedMatch(
  match: FifaMatchModel,
  player?: UserModel
) {
  if (!player) return false;
  if (match.homePlayerId === player.id) {
    return match.homeStatus === FifaMatchParticipantStatus.FORFEITED;
  }
  if (match.awayPlayerId === player.id) {
    return match.awayStatus === FifaMatchParticipantStatus.FORFEITED;
  }

  return false;
}

export function hasTeamForfeitedMatch(match: FifaMatchModel, team: TeamModel) {
  // TODO
  return false;
}

export function hasForfeitedMatch(
  match: FifaMatchModel,
  user: UserModel | undefined,
  isTeamMatch: boolean = false
) {
  return isTeamMatch
    ? !!user && !!user.team && hasTeamForfeitedMatch(match, user.team)
    : hasPlayerForfeitedMatch(match, user);
}
