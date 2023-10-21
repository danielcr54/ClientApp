import React from 'react';
import styled from '@emotion/styled';
import { Redirect } from 'react-router';
import {
  LinkLikeButton,
  styleSettings,
  ModalAlertDialog,
  ModalConfirmDialog
} from '@igg/common';
import { ActionLinks, ActionLinksItem } from '../../shared/ActionLinks';
import { UserModel } from '../../core/types';
import {
  FifaTournamentModel,
  FifaMatchForfeitReason,
  FifaMatchStatus
} from '../types';
import {
  isMatchInProgress,
  isPastMatch,
  getPlayerActiveMatch,
  resolveMatchTimeSlots,
  isTeamTournament,
  hasSubmittedMatchResult,
  isReadyForMatch,
  areMatchTimeSlotsSelectable,
  formatDateTimeLabel,
  hasForfeitedMatch
} from '../tournamentHelpers';
import { FIFA_TOURNAMENT_DETAILS_QUERY } from '../data/FifaTournamentDetailsQuery';
import { ForfeitFifaMatchMutation } from '../data/ForfeitFifaMatchMutation';
import { UpcomingFifaMatchPane } from './UpcomingFifaMatchPane';
import { FifaMatchResultFormPane } from './FifaMatchResultFormPane';
import { EndedFifaMatchMessagePane } from './EndedFifaMatchMessagePane';
import FifaRoundTimeSlotModal from './FifaRoundTimeSlotModal';
import { SetFifaMatchTimeSlotsMutation } from '../data/SetFifaMatchTimeSlotsMutation';
import { getErrorMessage } from '../../shared/errorHelpers';

const { colors } = styleSettings;

// Styled helpers

const ActiveFifaMatchSectionRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});

const ActiveFifaMatchSectionHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '12px 0',
  fontSize: 18,
  color: colors.white
});

const ActiveFifaMatchSectionHeaderMain = styled('div')({
  flex: 1
});

const ActiveFifaMatchSectionHeaderSublabel = styled('span')({
  marginLeft: 5,
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',
  fontStyle: 'italic'
});

const ActiveFifaMatchSectionHeaderActions = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
});

const ActiveFifaMatchSectionBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',

  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});

function parseDate(dateString?: string) {
  if (!dateString) return void 0;
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return void 0;
  return new Date(parsedDate);
}

function transformTimeSlotsData(timeSlotsData: any[]) {
  if (!timeSlotsData) return void 0;
  return timeSlotsData.map(timeSlotData => ({
    ...timeSlotData,
    startTime: parseDate(timeSlotData.startTime),
    endTime: parseDate(timeSlotData.endTime)
  }));
}

// Exported component

export interface ActiveFifaMatchSectionProps {
  tournament: FifaTournamentModel;
  currentUser: UserModel;
}

export function ActiveFifaMatchSection({
  tournament,
  currentUser
}: ActiveFifaMatchSectionProps) {
  const match = getPlayerActiveMatch(tournament, currentUser);
  if (!match) return null;

  const isTeamMatch = isTeamTournament(tournament);
  const timeSlots = tournament.rounds.filter(
    round => round.id === match.roundId
  )[0].timeSlots;
  const hasUserSubmittedResult = hasSubmittedMatchResult(
    match,
    currentUser,
    isTeamMatch
  );
  const isReady = isReadyForMatch(match, currentUser, isTeamMatch);
  const hasForfeited = hasForfeitedMatch(match, currentUser, isTeamMatch);
  const isCancelled = match.status === FifaMatchStatus.CANCELLED;
  const _isPastMatch = isPastMatch(match);
  const _isMatchInProgress = isMatchInProgress(match);

  const shouldShowMessagePane =
    [
      FifaMatchStatus.COMPLETED,
      FifaMatchStatus.VERIFIED,
      FifaMatchStatus.CANCELLED,
      FifaMatchStatus.DID_NOT_FINISH
    ].includes(match.status) ||
    (hasUserSubmittedResult && match.status === FifaMatchStatus.DISPUTE);

  const shouldShowResultFormPane =
    match.status === FifaMatchStatus.IN_GAME && isReady;

  // const shouldShowResultFormPane = true;

  const shouldShowUpcomingMatchPane =
    !shouldShowMessagePane && !shouldShowResultFormPane;

  const showMatchKickoffTime =
    !_isPastMatch && !_isMatchInProgress && !hasForfeited && !isCancelled;

  return (
    <ActiveFifaMatchSectionRoot>
      <ActiveFifaMatchSectionHeader>
        <ActiveFifaMatchSectionHeaderMain>
          {(shouldShowUpcomingMatchPane || shouldShowMessagePane) && (
            <>
              Your{' '}
              {hasForfeited || _isPastMatch
                ? 'last'
                : _isMatchInProgress
                ? 'current'
                : 'next'}{' '}
              match
              {showMatchKickoffTime && (
                <ActiveFifaMatchSectionHeaderSublabel>
                  starts {formatDateTimeLabel(match.kickoffTime)}
                </ActiveFifaMatchSectionHeaderSublabel>
              )}
            </>
          )}

          {shouldShowResultFormPane && 'Submit Your Result'}
        </ActiveFifaMatchSectionHeaderMain>

        <ModalAlertDialog>
          {({ open: alert }) => (
            <ActiveFifaMatchSectionHeaderActions>
              <ActionLinks>
                <ActionLinksItem>
                  <ForfeitFifaMatchMutation
                    onError={error => alert(getErrorMessage(error))}
                  >
                    {(forfeitFifaMatch, { loading, error, data }) => (
                      <>
                        {data &&
                          data.forfeitFifaMatch &&
                          data.forfeitFifaMatch.match && <Redirect to="/" />}

                        <ModalConfirmDialog
                          message="Are you sure you want to forfeit?"
                          confirmButtonText="FORFEIT"
                          onConfirm={() => {
                            forfeitFifaMatch({
                              variables: {
                                input: {
                                  matchId: match.id,
                                  reason: FifaMatchForfeitReason.USER_INITIATED
                                }
                              },
                              refetchQueries: [
                                {
                                  query: FIFA_TOURNAMENT_DETAILS_QUERY,
                                  variables: { urlSlug: tournament.urlSlug }
                                }
                              ]
                            });
                          }}
                        >
                          {({ open: confirm }) => (
                            <LinkLikeButton onClick={() => confirm()}>
                              Forfeit
                            </LinkLikeButton>
                          )}
                        </ModalConfirmDialog>
                      </>
                    )}
                  </ForfeitFifaMatchMutation>
                </ActionLinksItem>

                <ActionLinksItem>
                  <SetFifaMatchTimeSlotsMutation
                    onError={error => alert(getErrorMessage(error))}
                  >
                    {(setFifaMatchTimeSlots, { loading, error, data }) => (
                      <FifaRoundTimeSlotModal
                        selectedTimeSlots={
                          (data &&
                            data.setFifaMatchTimeSlots &&
                            transformTimeSlotsData(
                              data.setFifaMatchTimeSlots.timeSlots
                            )) ||
                          void 0
                        }
                        timeSlots={timeSlots}
                        join={false}
                        success={!!(data && data.setFifaMatchTimeSlots)}
                        loading={loading}
                        onFormSubmit={formModel =>
                          setFifaMatchTimeSlots({
                            variables: {
                              input: {
                                matchId: match.id,
                                playerId: currentUser.id,
                                teamId: currentUser.teamId,
                                timeSlotIds: formModel.roundTimeSlotIds
                              }
                            },
                            refetchQueries: [
                              {
                                query: FIFA_TOURNAMENT_DETAILS_QUERY,
                                variables: {
                                  urlSlug: tournament.urlSlug
                                }
                              }
                            ]
                          })
                        }
                      >
                        {({ isOpen, open, close }) => {
                          const timeSlotsSelectable = areMatchTimeSlotsSelectable(
                            currentUser,
                            match
                          );

                          return (
                            <LinkLikeButton
                              disabled={!timeSlotsSelectable}
                              onClick={() =>
                                timeSlotsSelectable ? open() : void 0
                              }
                            >
                              Schedule
                            </LinkLikeButton>
                          );
                        }}
                      </FifaRoundTimeSlotModal>
                    )}
                  </SetFifaMatchTimeSlotsMutation>
                </ActionLinksItem>
              </ActionLinks>
            </ActiveFifaMatchSectionHeaderActions>
          )}
        </ModalAlertDialog>
      </ActiveFifaMatchSectionHeader>

      <ActiveFifaMatchSectionBody>
        {shouldShowUpcomingMatchPane && (
          <UpcomingFifaMatchPane
            tournamentUrlSlug={tournament.urlSlug}
            consoleIds={tournament.consoleIds}
            match={match}
            currentUser={currentUser}
            isTeamMatch={isTeamMatch}
          />
        )}

        {shouldShowResultFormPane && (
          <FifaMatchResultFormPane
            tournamentUrlSlug={tournament.urlSlug}
            match={match}
            isTeamMatch={isTeamMatch}
            currentUser={currentUser}
          />
        )}

        {shouldShowMessagePane && (
          <EndedFifaMatchMessagePane
            match={match}
            isTeamMatch={isTeamMatch}
            currentUser={currentUser}
          />
        )}
      </ActiveFifaMatchSectionBody>
    </ActiveFifaMatchSectionRoot>
  );
}
