import React from 'react';
import Media from 'react-media';
import { NoContent } from '@igg/common';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import {
  FifaTournamentRoundModel,
  FifaTournamentGroupModel,
  FifaTournamentModel
} from '../types';
import {
  TournamentStructureBodySection,
  TournamentStructureBodySectionHeading
} from '../tournamentsElements';
import {
  TournamentRoundInfoBlock,
  TournamentRoundInfoBlockWrapper
} from '../TournamentRoundInfoBlocks';
import {
  getRegularRounds,
  formatRoundName,
  getRoundGroupMatches,
  getRoundMatches,
  isRoundUpcoming,
  isTeamTournament
} from '../tournamentHelpers';
import { FifaMatchCardList } from './FifaMatchCardList';

// Helpers

export function renderNoMatchData() {
  return (
    <NoContent
      message="No match data is available yet"
      note="Keep an eye on the updates!"
    />
  );
}

export interface FifaTournamentStructurePlainViewProps {
  tournament: FifaTournamentModel;
  round?: FifaTournamentRoundModel;
  group?: FifaTournamentGroupModel;
}

export function FifaTournamentStructurePlainView({
  tournament,
  round,
  group
}: FifaTournamentStructurePlainViewProps) {
  if (round) {
    const roundMatches = getRoundMatches(tournament, round.id);
    if (!roundMatches || !roundMatches.length) {
      return renderNoMatchData();
    }

    return (
      <TournamentStructureBodySection>
        <FifaMatchCardList matches={roundMatches} />
      </TournamentStructureBodySection>
    );
  }

  if (!group) return renderNoMatchData();

  const groupRounds = getRegularRounds(tournament.rounds);
  if (!groupRounds || !groupRounds.length) return renderNoMatchData();

  const _isTeamTournament = isTeamTournament(tournament);

  return (
    <>
      {groupRounds.map(groupRound => {
        const roundGroupMatches = getRoundGroupMatches(
          tournament,
          groupRound.id,
          group.id
        );

        return (
          <TournamentStructureBodySection key={groupRound.id}>
            <Media query={deviceScreenQuery.medium}>
              {largeScreen =>
                largeScreen ? (
                  <TournamentStructureBodySectionHeading>
                    {formatRoundName(groupRound)}
                  </TournamentStructureBodySectionHeading>
                ) : (
                  <TournamentRoundInfoBlockWrapper>
                    <TournamentRoundInfoBlock
                      round={groupRound}
                      upcoming={isRoundUpcoming(groupRound, groupRounds)}
                    />
                  </TournamentRoundInfoBlockWrapper>
                )
              }
            </Media>

            {roundGroupMatches && roundGroupMatches.length ? (
              <FifaMatchCardList
                matches={roundGroupMatches}
                isTeamTournament={_isTeamTournament}
              />
            ) : (
              <NoContent message="No match data available yet" />
            )}
          </TournamentStructureBodySection>
        );
      })}
    </>
  );
}
