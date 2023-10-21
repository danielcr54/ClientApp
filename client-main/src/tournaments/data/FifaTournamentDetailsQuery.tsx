import React, { ReactNode } from 'react';
import { gql, ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { parseDate } from '../../shared/dateTimeHelpers';
import { FifaTournamentModel } from '../types';

const userAttrs = `
  id
  username
  displayName
  profile {
    avatarUrl
    language
    countryCode
    xboxUsername
    psnUsername
  }
`;

const teamAttrs = `
  id
  name
  urlSlug
  logoUrl
  languages
  countryCode
  consoleIds
`;

export const matchAttrs = `
  id
  kickoffTime
  finishTime
  roundId
  groupId
  nextMatchId
  homePlayerId
  homePlayer {
    ${userAttrs}
  }
  awayPlayerId
  awayPlayer {
    ${userAttrs}
  }
  winnerId
  winner {
    ${userAttrs}
  }
  winnerTeamId
  homeTimeSlotIds
  awayTimeSlotIds
  homeStreamUrl
  awayStreamUrl
  homeScoreSubmission {
    ownScore
    opponentScore
    submittedAt
  }
  awayScoreSubmission {
    ownScore
    opponentScore
    submittedAt
  }
  homeScore
  awayScore
  homeReadyAt
  awayReadyAt
  homeDisqualifiedAt
  awayDisqualifiedAt
  homeForfeit {
    reason
    comment
    forfeitedAt
  }
  awayForfeit {
    reason
    comment
    forfeitedAt
  }
  homeStatus
  awayStatus
  status

`;

const roundAttrs = `
  id
  type
  order
  timeSlots {
    id
    startTime
    endTime
  }
  prizes {
    id
    name
    type
  }
  startTime
  endTime
`;

export const FIFA_TOURNAMENT_DETAILS_QUERY = gql`
  query FifaTournamentDetails($urlSlug: String!) {
    tournamentByUrlSlug(urlSlug: $urlSlug) {
      id
      title
      urlSlug
      gameMode
      type
      consoleIds
      maxPlayers
      players {
        ${userAttrs}
      }
      teams {
        ${teamAttrs}
      }
      rounds {
        ${roundAttrs}
      }
      groups {
        id
        order
      }
      matches {
        ${matchAttrs}
      }
      winner {
        ${userAttrs}
      }
      winnerTeam {
        ${teamAttrs}
      }
      startTime
      endTime
      prizes {
        id
        name
        type
        place
      }
      matchLength
      teamSize
      groupSize
      status
    }
  }
`;

export interface FifaTournamentDetailsQueryProps {
  urlSlug: string;
  children?: (tournament: FifaTournamentModel) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error?: ApolloError) => ReactNode;
  forceRefetch?: boolean;
}

// TODO: Extract to be a more generic helper maybe?
// TODO: And provide correct types too
function getPlayerById(players: any[], playerId: string) {
  if (!players || !players.length || !playerId) return void 0;
  return players.find(p => p && p.id === playerId);
}

function getTeamById(teams: any[], teamId: string) {
  if (!teams || !teams.length || !teamId) return void 0;
  return teams.find(t => t && t.id === teamId);
}

export function parseTournamentData(tournamentData: any) {
  const rounds = tournamentData.rounds.map((roundData: any) => ({
    ...roundData,
    startTime: parseDate(roundData.startTime),
    endTime: parseDate(roundData.endTime),
    timeSlots: (roundData.timeSlots || []).map((timeSlotData: any) => ({
      ...timeSlotData,
      startTime: parseDate(timeSlotData.startTime),
      endTime: parseDate(timeSlotData.endTime)
    })).sort( (a: any, b: any) => a.startTime.getTime() - b.startTime.getTime() )
  }));



  rounds.sort(
    (round: any, otherRound: any) =>
      (round.startTime ? round.startTime.getTime() : 0) -
      (otherRound.startTime ? otherRound.startTime.getTime() : 0)
  );

  const matches = (tournamentData.matches || []).map((matchData: any) => ({
    ...matchData,
    kickoffTime: parseDate(matchData.kickoffTime),
    finishTime: parseDate(matchData.finishTime),
    homePlayer: getPlayerById(tournamentData.players, matchData.homePlayerId),
    awayPlayer: getPlayerById(tournamentData.players, matchData.awayPlayerId),
    homeTeam: getTeamById(tournamentData.teams, matchData.homeTeamId),
    awayTeam: getTeamById(tournamentData.teams, matchData.awayTeamId),
    winner: getPlayerById(tournamentData.players, matchData.winnerId),
    winnerTeam: getTeamById(tournamentData.teams, matchData.winnerTeamId)
  }));

  return {
    ...tournamentData,
    startTime: parseDate(tournamentData.startTime),
    endTime: parseDate(tournamentData.endTime),
    rounds,
    matches
  };
}

export function FifaTournamentDetailsQuery({
  urlSlug,
  children,
  renderLoading,
  renderError,
  forceRefetch
}: FifaTournamentDetailsQueryProps) {
  if (!children) return null;

  return (
    <Query query={FIFA_TOURNAMENT_DETAILS_QUERY} variables={{ urlSlug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return typeof renderLoading === 'function' ? renderLoading() : null;
        }
        if (error) {
          return typeof renderError === 'function' ? renderError() : null;
        }

        if (!data || !data.tournamentByUrlSlug) return null;
        return children(parseTournamentData(data.tournamentByUrlSlug));
      }}
    </Query>
  );
}
