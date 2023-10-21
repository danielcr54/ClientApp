import React from 'react';
import styled from '@emotion/styled';
import { ButtonNavLink } from '@igg/common';
import {
  Card,
  CardContent,
  CardSection,
  CardMainSection,
  CardContentCell,
  CardMessage
} from '../../shared/card';
import { TeamModel } from '../../teams/types';
import { TeamMediaObject } from '../../teams/TeamMediaObject';
import TeamCardStats from '../../teams/TeamCardStats';
import {
  TeamMemberInlineAvatars,
  TeamMemberInlineAvatarsItem
} from '../../teams/teamsElements';
import { PlayerList, PlayerListItem } from '../../players/PlayerList';
import { PlayerMediaObject } from '../../players/PlayerMediaObject';
import { StyledTournamentStatusLabel } from '../TournamentStatusLabel';
import { MatchPlayersSelect } from '../MatchPlayersSelect';
import { MarkAsReadyForFifaMatchForm } from './MarkAsReadyForFifaMatchForm';

// Styled helpers

const ContextBlock = styled('div')({
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
});

const ContextLabel = styled('div')({
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',

  '&:not(:last-of-type)': {
    marginBottom: 8
  }
});

const MatchTimeNote = styled('div')({
  marginBottom: 25,
  fontSize: 13
});

const MatchTimeNoteMessage = styled('div')({
  marginBottom: 8,
  color: 'rgba(255, 255, 255, 0.55)'
});

const MatchTimeStatusLabel = StyledTournamentStatusLabel;

// Exported component

export interface FifaMatchTeamActionCardProps {
  team?: TeamModel;
  showStats?: boolean;
  isUserTeam?: boolean;
  cardMessage?: string;
  playersRequired?: number;
  showJoinForm?: boolean;
  onJoinClick?: (formModel: any) => void; // TODO: type
  isOpponent: boolean;
}

export function FifaMatchTeamActionCard({
  team,
  showStats,
  cardMessage,
  isUserTeam,
  playersRequired,
  showJoinForm
}: FifaMatchTeamActionCardProps) {
  return (
    <Card faded={true}>
      <CardSection>
        <CardContent forceHorizontal={true}>
          <CardContentCell main={true} forceAlignStart={true} rowContext={true}>
            <TeamMediaObject team={team} />
          </CardContentCell>

          {team && !isUserTeam && (
            <CardContentCell alignEnd={true} verticalAlignCenter={true}>
              <ButtonNavLink
                to={`/teams/${team.urlSlug}`}
                small={true}
                inverse={true}
              >
                View Team
              </ButtonNavLink>
            </CardContentCell>
          )}

          {team && isUserTeam && (
            <ContextBlock>
              <ContextLabel>
                {playersRequired || 2} Players required
              </ContextLabel>
              <TeamMemberInlineAvatars>
                <TeamMemberInlineAvatarsItem size={18} />
                <TeamMemberInlineAvatarsItem size={18} />
                <TeamMemberInlineAvatarsItem size={18} />
              </TeamMemberInlineAvatars>
            </ContextBlock>
          )}
        </CardContent>
      </CardSection>

      <CardMainSection>
        <CardContent forceHorizontal={true}>
          {isUserTeam ? (
            showJoinForm ? (
              <CardContentCell
                main={true}
                stretch={true}
                forceAlignStart={true}
              >
                <MatchTimeNote>
                  <MatchTimeNoteMessage>
                    Game is about to start
                  </MatchTimeNoteMessage>
                  <MatchTimeStatusLabel>5 minutes</MatchTimeStatusLabel>
                </MatchTimeNote>

                <MarkAsReadyForFifaMatchForm onSubmit={() => Promise.resolve()} />
              </CardContentCell>
            ) : (
              <MatchPlayersSelect
                contextLabel={isUserTeam ? 'Select Round 1 players' : 'Players'}
                players={[]}
                selectedPlayers={[]}
                onPlayerSelect={() => void 0}
                playersRequired={3}
              />
            )
          ) : (
            <PlayerList>
              <PlayerListItem>
                <PlayerMediaObject
                  player={{
                    id: 'otherTeamPlayer1',
                    displayName: 'user 1',
                    username: 'otherteamplayer',
                    email: 'otherplayer1@iggalaxy.com',
                    profile: {
                      firstName: 'Johnny',
                      lastName: 'Doooey'
                    },
                    teamRole: 'Team Captain'
                  }}
                  showTeamRole={true}
                />
              </PlayerListItem>
              <PlayerListItem>
                <PlayerMediaObject />
              </PlayerListItem>
              <PlayerListItem>
                <PlayerMediaObject />
              </PlayerListItem>
            </PlayerList>
          )}
        </CardContent>
      </CardMainSection>

      {showStats && <TeamCardStats team={team} />}

      {cardMessage && (
        <CardSection borderTop={true}>
          <CardContent>
            <CardContentCell main={true}>
              <CardMessage alignCenter={true}>{cardMessage}</CardMessage>
            </CardContentCell>
          </CardContent>
        </CardSection>
      )}
    </Card>
  );
}
