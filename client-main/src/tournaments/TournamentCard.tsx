import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { styleSettings, ButtonNavLink } from '@igg/common';
import {
  Card,
  CardHeader,
  CardHeaderCell,
  CardContent,
  CardSection,
  CardMainSection,
  CardContentActions,
  CardStat,
  CardStatValue,
  CardStatLabel,
  CardHighlightText,
  CardContentCell,
  CardContentMeta
} from '../shared/card';
import { LabeledTextBlock } from '../shared/LabeledTextBlock';
import { ConsoleBadgeIconsBlock } from '../shared/ConsoleBadgeIconsBlock';
import { UserAvatar } from '../shared/UserAvatar';
import { UserModel } from '../core/types';
import { FifaTournamentModel } from './types';
import { TournamentStatusLabel } from './TournamentStatusLabel';
import { TournamentCardPrizeSection } from './TournamentCardPrizeSection';
import {
  formatTournamentPlayerCount,
  isTournamentParticipant,
  shouldAllowJoin,
  getWinnerPrizes,
  getPrizePoolData
} from './tournamentHelpers';

const { colors } = styleSettings;

// Tournament specific styled components

const TournamentCardConsoles = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8
});

const TournamentCardTitle = styled('div')({
  marginBottom: 10,
  padding: '10px 0',
  fontSize: 35,
  fontWeight: 500,
  color: colors.white,

  '&, &:hover, &:focus, &:active': {
    textDecoration: 'none'
  }
});

const TournamentCardTitleNavLink = styled(TournamentCardTitle)({
  marginBottom: 0
}).withComponent(NavLink);

// Some tournament players-specific metadata styling

const TournamentMembersMeta = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});

// TODO: Perhaps make a separate component with props, some logic, etc
const TournamentParticipantImages = styled('div')({
  display: 'inline-flex',
  marginRight: 8,
  color: 'rgba(255, 255, 255, 0.55)'
});

const TournamentParticipantImagesItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  fontSize: 8,
  color: 'white',

  '&:not(:last-of-type)': {
    marginRight: 3
  }
});

const TournamentMembersMetaText = styled('span')({
  color: 'rgba(255, 255, 255, 0.55)'
});

// Rendering helpers

// function renderStatsSection(tournament: FifaTournamentModel) {
//   return (
//     <CardSection borderTop={true}>
//       <CardRow>
//         <CardCell borderRight={true}>
//           <CardStat>
//             <CardStatValue>16</CardStatValue>
//             <CardStatLabel>Played</CardStatLabel>
//           </CardStat>
//         </CardCell>

//         <CardCell borderRight={true}>
//           <CardStat>
//             <CardStatValue>6</CardStatValue>
//             <CardStatLabel>Won</CardStatLabel>
//           </CardStat>
//         </CardCell>

//         <CardCell>
//           <CardStat>
//             <CardStatValue>10</CardStatValue>
//             <CardStatLabel>Lost</CardStatLabel>
//           </CardStat>
//         </CardCell>
//       </CardRow>
//     </CardSection>
//   );
// }

// TODO: Probably create a normal component from it
function renderCardMeta(tournament: FifaTournamentModel) {
  return (
    <CardContentMeta>
      <TournamentMembersMeta>
        {!!tournament.players.length && (
          <TournamentParticipantImages>
            {tournament.players.slice(0, 3).map(player => (
              <TournamentParticipantImagesItem key={player.id}>
                <UserAvatar user={player} size={16} />
              </TournamentParticipantImagesItem>
            ))}
          </TournamentParticipantImages>
        )}

        <TournamentMembersMetaText>
          {formatTournamentPlayerCount(tournament)} Players
        </TournamentMembersMetaText>
      </TournamentMembersMeta>
    </CardContentMeta>
  );
}

// Exported component

export interface TournamentCardProps {
  tournament: FifaTournamentModel;
  currentUser: UserModel;
  contextLabel?: string;
}

export function TournamentCard({
  tournament,
  currentUser,
  contextLabel
}: TournamentCardProps) {
  const isParticipantView = isTournamentParticipant(tournament, currentUser);
  const allowJoin = shouldAllowJoin(tournament, currentUser);

  return (
    <Card>
      <CardHeader>
        <CardHeaderCell main={true}>
          <CardHighlightText>
            <TournamentStatusLabel status={tournament.status} />
          </CardHighlightText>
        </CardHeaderCell>

        {!!(tournament.rounds && tournament.rounds.length) && (
          <CardHeaderCell main={true} alignEnd={true}>
            {tournament.rounds.length} Rounds
          </CardHeaderCell>
        )}
      </CardHeader>

      <CardMainSection>
        <CardContent>
          <CardContentCell main={true} alignCenter={true}>
            <TournamentCardConsoles>
              <ConsoleBadgeIconsBlock
                consoleIds={tournament.consoleIds}
                size={52}
              />
            </TournamentCardConsoles>

            <TournamentCardTitleNavLink
              to={`/tournaments/${tournament.urlSlug}`}
            >
              {tournament.title}
            </TournamentCardTitleNavLink>

            {renderCardMeta(tournament)}
          </CardContentCell>
        </CardContent>
      </CardMainSection>

      <CardSection>
        <CardContent padding="8px 25px 25px">
          <CardContentCell main={true} alignCenter={true}>
            <CardContentActions stretch={true}>
              <ButtonNavLink
                block={true}
                large={true}
                secondary={true}
                to={`/tournaments/${tournament.urlSlug}`}
              >
                {allowJoin ? 'Join tournament' : 'View tournament'}
              </ButtonNavLink>
            </CardContentActions>
          </CardContentCell>
        </CardContent>
      </CardSection>

      {/* {renderStatsSection(tournament)} */}

      <TournamentCardPrizeSection prizes={getPrizePoolData(tournament)} />
    </Card>
  );
}

export default TournamentCard;
