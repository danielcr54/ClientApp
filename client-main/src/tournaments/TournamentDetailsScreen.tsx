import React from 'react';
import Media from 'react-media';
import { RouteComponentProps } from 'react-router';
import {
  ScreenContentSection,
  NoContent,
  ScreenContentHeaderLayout,
  ScreenContentHeaderMain,
  ScreenContentHeaderAside,
  Button,
  LoadingScreen,
  ModalState,
  Modal,
  StretchToContainer,
  FifaUltimateTeamIcon,
  FifaClassicIcon
} from '@igg/common';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import {
  DetailsScreenSection,
  DetailsScreenSectionMain,
  DetailsScreenSectionBody
} from '../shared/detailsScreenElements';
import { LabeledTextBlock } from '../shared/LabeledTextBlock';
import { HexagonBadge } from '../shared/HexagonBadge';
import { ConsoleBadgeIconsBlock } from '../shared/ConsoleBadgeIconsBlock';
import { UserModel, GameMode } from '../core/types';
import { UserInfoQuery } from '../core/UserInfoQuery';
import { FifaTournamentModel, TournamentPrizeModel } from './types';
import { FifaTournamentDetailsQuery } from './data/FifaTournamentDetailsQuery';
import {
  TournamentDetailsScreenContentHeader,
  TournamentDetailsScreenHeading,
  TournamentDetailsScreenSubheading,
  TournamentRulesLink,
  TournamentDetailsMeta,
  TournamentDetailsMetaRow,
  TournamentDetailsMetaCell,
  TournamentDetailsMetaStatsRow,
  TournamentDetailsMetaStatsCell,
  TournamentDetailsScreenHeadingText,
  TournamentDetailsScreenHeadingConsoles,
  TournamentPrizeBlockList,
  TournamentPrizeBlock,
  TournamentPrizeFigure,
  TournamentModeIcon,
  TournamentPrizeIconContainer
} from './tournamentsElements';
import {
  gameModeLabel,
  formatTournamentPlayerCount,
  isTournamentParticipant,
  shouldAllowJoin,
  formatPrizePlaceLabel,
  getMissingConsoleIds,
  getWinnerPrizes
} from './tournamentHelpers';
import { TournamentRoundInfoBlocks } from './TournamentRoundInfoBlocks';
import { TournamentStatusLabel } from './TournamentStatusLabel';
import { FifaTournamentStructure } from './fifa/FifaTournamentStructure';
import { TournamentRulesModalContent } from './TournamentRulesModalContent';
import { JoinFifaTournamentInitButton } from './fifa/JoinFifaTournamentInitButton';
import { ActiveFifaMatchSection } from './fifa/ActiveFifaMatchSection';

// Rendering helpers

function renderPrizeIcon(prize: TournamentPrizeModel) {
  if (prize.place === 1) {
    return (
      <TournamentPrizeIconContainer>
        <img src="/images/place1_icon.svg" />
      </TournamentPrizeIconContainer>
    );
  }

  if (prize.place === 2) {
    return (
      <TournamentPrizeIconContainer>
        <img src="/images/place2_icon.svg" />
      </TournamentPrizeIconContainer>
    );
  }

  if (prize.place === 3) {
    return (
      <TournamentPrizeIconContainer>
        <img src="/images/place3_icon.svg" />
      </TournamentPrizeIconContainer>
    );
  }

  return <HexagonBadge size={35} />;
}

function renderPrizes(tournament: FifaTournamentModel) {
  if (!tournament || !tournament.prizes) return null;

  return (
    <TournamentPrizeBlockList>
      {getWinnerPrizes(tournament.prizes).map((prize, index) => (
        <TournamentPrizeBlock key={prize.id}>
          <TournamentPrizeFigure>
            {renderPrizeIcon(prize)}
          </TournamentPrizeFigure>

          <LabeledTextBlock
            label={formatPrizePlaceLabel(prize.place)}
            text={prize.name}
            textFirst={true}
            large={true}
          />
        </TournamentPrizeBlock>
      ))}
    </TournamentPrizeBlockList>
  );
}

function renderMeta(tournament: FifaTournamentModel) {
  const { gameMode } = tournament;

  return (
    <TournamentDetailsMeta>
      <TournamentDetailsMetaRow>
        <TournamentDetailsMetaCell grow={true}>
          {renderPrizes(tournament)}
        </TournamentDetailsMetaCell>

        <TournamentDetailsMetaCell>
          <TournamentDetailsMetaStatsRow>
            {/* <TournamentDetailsMetaStatsCell>
                <LabeledTextBlock
                  label="Played"
                  text="15 minutes"
                  textFirst={true}
                  large={true}
                  noWrap={true}
                />
              </TournamentDetailsMetaStatsCell> */}

            <TournamentDetailsMetaStatsCell>
              {(() => {
                if (gameMode === GameMode.ULTIMATE_TEAM) {
                  return (
                    <TournamentModeIcon>
                      <FifaUltimateTeamIcon />
                    </TournamentModeIcon>
                  );
                }

                if (gameMode === GameMode.CLASSIC) {
                  return (
                    <TournamentModeIcon>
                      <FifaClassicIcon />
                    </TournamentModeIcon>
                  );
                }

                return (
                  <LabeledTextBlock
                    label="Tournament mode"
                    text={gameModeLabel(gameMode)}
                    textFirst={true}
                    large={true}
                    noWrap={true}
                  />
                );
              })()}
            </TournamentDetailsMetaStatsCell>

            <TournamentDetailsMetaStatsCell>
              <LabeledTextBlock
                label="Joined"
                text={formatTournamentPlayerCount(tournament)}
                textFirst={true}
                large={true}
                noWrap={true}
              />
            </TournamentDetailsMetaStatsCell>

            {/* <TournamentDetailsMetaStatsCell>
                <LabeledTextBlock
                  label="Golden Goal"
                  text="Enabled"
                  textFirst={true}
                  large={true}
                  noWrap={true}
                />
              </TournamentDetailsMetaStatsCell> */}
          </TournamentDetailsMetaStatsRow>
        </TournamentDetailsMetaCell>
      </TournamentDetailsMetaRow>
    </TournamentDetailsMeta>
  );
}

function renderRounds(tournament: FifaTournamentModel) {
  if (!tournament.rounds || !tournament.rounds.length) return null;

  return <TournamentRoundInfoBlocks rounds={tournament.rounds} />;
}

export interface TournamentDetailsScreenRouteParams {
  urlSlug: string;
}

export interface TournamentDetailsScreenProps {
  tournament: FifaTournamentModel;
  currentUser: UserModel;
}

export function TournamentDetailsScreen({
  tournament,
  currentUser
}: TournamentDetailsScreenProps) {
  const isOwnerView =
    tournament.owner && currentUser && tournament.owner.id === currentUser.id;

  const isParticipantView = isTournamentParticipant(tournament, currentUser);
  const allowJoin = shouldAllowJoin(tournament, currentUser);
  const missingConsoleIds = getMissingConsoleIds(tournament, currentUser);

  return (
    <>
      <TournamentDetailsScreenContentHeader>
        <ScreenContentHeaderLayout>
          <ScreenContentHeaderMain>
            <TournamentDetailsScreenHeading>
              <TournamentDetailsScreenHeadingText>
                {tournament.title}
              </TournamentDetailsScreenHeadingText>

              <TournamentDetailsScreenHeadingConsoles>
                <ConsoleBadgeIconsBlock
                  consoleIds={tournament.consoleIds}
                  size={52}
                />
              </TournamentDetailsScreenHeadingConsoles>
            </TournamentDetailsScreenHeading>

            <TournamentDetailsScreenSubheading>
              <TournamentStatusLabel status={tournament.status} />

              <TournamentRulesLink>
                <ModalState>
                  {({ isOpen, open, close }) => (
                    <>
                      <Button onClick={open} inverse={true} xsmall={true}>
                        Rule book
                      </Button>

                      <Modal isOpen={isOpen} onRequestClose={close}>
                        <TournamentRulesModalContent />
                      </Modal>
                    </>
                  )}
                </ModalState>
              </TournamentRulesLink>
            </TournamentDetailsScreenSubheading>
          </ScreenContentHeaderMain>

          <ScreenContentHeaderAside>
            <JoinFifaTournamentInitButton
              tournament={tournament}
              currentUser={currentUser}
              allowJoin={allowJoin}
              missingConsoleIds={missingConsoleIds}
            />
          </ScreenContentHeaderAside>
        </ScreenContentHeaderLayout>
      </TournamentDetailsScreenContentHeader>

      <ScreenContentSection>
        <DetailsScreenSection>
          <DetailsScreenSectionBody>
            <DetailsScreenSectionMain>
              {renderMeta(tournament)}

              <Media
                query={deviceScreenQuery.medium}
                render={() => renderRounds(tournament)}
              />

              {isParticipantView && (
                <ActiveFifaMatchSection
                  tournament={tournament}
                  currentUser={currentUser}
                />
              )}
            </DetailsScreenSectionMain>
          </DetailsScreenSectionBody>
        </DetailsScreenSection>

        <DetailsScreenSection>
          <DetailsScreenSectionBody>
            <DetailsScreenSectionMain>
              <StretchToContainer>
                <FifaTournamentStructure tournament={tournament} />
              </StretchToContainer>
            </DetailsScreenSectionMain>
          </DetailsScreenSectionBody>
        </DetailsScreenSection>
      </ScreenContentSection>
    </>
  );
}

export default function TournamentDetailsScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TournamentDetailsScreenRouteParams>) {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />} forceRefetch={true}>
      {currentUser => (
        <FifaTournamentDetailsQuery
          urlSlug={urlSlug}
          renderLoading={() => <LoadingScreen />}
        >
          {tournament => (
            <TournamentDetailsScreen
              tournament={tournament}
              currentUser={currentUser}
            />
          )}
        </FifaTournamentDetailsQuery>
      )}
    </UserInfoQuery>
  );
}
