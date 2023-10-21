import React from 'react';
import { FaXbox, FaPlaystation } from 'react-icons/fa';
import {
  Button,
  ModalState,
  Modal,
  ModalAlertDialog,
  ModalDialogMessage
} from '@igg/common';
import { getErrorMessage } from '../../shared/errorHelpers';
import { UserModel } from '../../core/types';
import { FifaTournamentModel } from '../types';
import { JoinFifaTournamentModalContent } from './JoinFifaTournamentModalContent';
import { JoinFifaTournamentMutation } from '../data/JoinFifaTournamentMutation';
import { FIFA_TOURNAMENT_DETAILS_QUERY } from '../data/FifaTournamentDetailsQuery';
import { UpdateProfileMutation } from '../../profile/UpdateProfileMutation';
import FifaRoundTimeSlotModal from './FifaRoundTimeSlotModal';
import { USER_INFO_QUERY } from '../../core/UserInfoQuery';
import { UserAddConsoleForm } from '../../profile/UserAddConsoleForm';
import { resolveMatchTimeSlots } from '../tournamentHelpers';

// Helpers

// TODO: Make a generic helper instead (even better - try to
// come up with some pattern of automatic date transformation)
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

export interface JoinFifaTournamentInitButtonProps {
  tournament: FifaTournamentModel;
  currentUser: UserModel;
  allowJoin?: boolean;
  missingConsoleIds?: Array<string | undefined>;
}

export function JoinFifaTournamentInitButton({
  tournament,
  currentUser,
  allowJoin,
  missingConsoleIds
}: JoinFifaTournamentInitButtonProps) {
  const upcomingRound =
    tournament.rounds && tournament.rounds.length
      ? tournament.rounds[0]
      : void 0;

  return (
    <>
      {allowJoin ? (
        <ModalAlertDialog>
          {({ open: alert }) => (
            <>
              {missingConsoleIds && missingConsoleIds.length ? (
                <UpdateProfileMutation>
                  {(updateProfile, { data, loading, error }) => (
                    <ModalState>
                      {({ isOpen, open, close }) => (
                        <>
                          <Button
                            type="button"
                            large={true}
                            block={true}
                            onClick={open}
                          >
                            Join tournament
                          </Button>

                          <Modal
                            dialogStyle={true}
                            inverseStyle={true}
                            isOpen={isOpen}
                            onRequestClose={close}
                          >
                            <ModalDialogMessage>
                              This tournament requires{' '}
                              {missingConsoleIds.includes('ps4')
                                ? 'a PS4'
                                : missingConsoleIds.includes('xbox')
                                ? 'an XBOX'
                                : 'a PS4 or an XBOX'}{' '}
                              console to proceed. Please provide us with the
                              console username or choose another tournament
                            </ModalDialogMessage>

                            <UserAddConsoleForm
                              consoleIds={missingConsoleIds}
                              formData={undefined}
                              inProgress={loading}
                              success={!!(data && data.updateProfile)}
                              onSubmit={formModel =>
                                updateProfile({
                                  variables: {
                                    input: {
                                      ...currentUser.profile,
                                      ...formModel
                                    }
                                  },
                                  refetchQueries: [{ query: USER_INFO_QUERY }],
                                  awaitRefetchQueries: true
                                })
                              }
                              onCancel={close}
                            />
                          </Modal>
                        </>
                      )}
                    </ModalState>
                  )}
                </UpdateProfileMutation>
              ) : (
                <JoinFifaTournamentMutation
                  onError={error => alert(getErrorMessage(error))}
                >
                  {(join, { data, loading, error }) => (
                    <FifaRoundTimeSlotModal
                      selectedTimeSlots={
                        (data &&
                          data.joinTournament &&
                          resolveMatchTimeSlots(
                            data.joinTournament.firstMatch,
                            currentUser
                          )) ||
                        void 0
                      }
                      timeSlots={
                        upcomingRound ? upcomingRound.timeSlots : void 0
                      }
                      join={true}
                      success={!!(data && data.joinTournament)}
                      loading={loading}
                      onFormSubmit={formModel =>
                        join({
                          variables: {
                            input: {
                              tournamentId: tournament.id,
                              firstMatchTimeSlotIds: formModel.roundTimeSlotIds
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
                      {({ isOpen, open, close }) => (
                        <Button
                          type="button"
                          large={true}
                          block={true}
                          onClick={open}
                        >
                          Join tournament
                        </Button>
                      )}
                    </FifaRoundTimeSlotModal>
                  )}
                </JoinFifaTournamentMutation>
              )}
            </>
          )}
        </ModalAlertDialog>
      ) : null}
    </>
  );
}
