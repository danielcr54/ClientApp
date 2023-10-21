import React from 'react';
import { ModalAlertDialog } from '@igg/common';
import {
  getErrorMessage,
  resolveGraphQLSubmitErrors
} from '../../shared/errorHelpers';
import { Card } from '../../shared/card';
import { UserModel } from '../../core/types';
import { hasSubmittedMatchResult } from '../tournamentHelpers';
import { FIFA_TOURNAMENT_DETAILS_QUERY } from '../data/FifaTournamentDetailsQuery';
import { SubmitFifaMatchResultMutation } from '../data/SubmitFifaMatchResultMutation';
import { FifaMatchPlayerResultForm } from './FifaMatchPlayerResultForm';
import { FifaMatchModel } from '../types';

export interface FifaMatchResultFormPaneProps {
  tournamentUrlSlug: string;
  match: FifaMatchModel;
  isTeamMatch?: boolean;
  currentUser: UserModel;
}

export function FifaMatchResultFormPane({
  tournamentUrlSlug,
  match,
  currentUser,
  isTeamMatch,
  ...formProps
}: FifaMatchResultFormPaneProps) {
  return (
    <Card faded={true}>
      {isTeamMatch ? (
        <>[Team score submission form is to be implemented]</>
      ) : (
        <ModalAlertDialog>
          {({ open: alert }) => (
            <SubmitFifaMatchResultMutation
              onError={error => alert(getErrorMessage(error))}
            >
              {(submitFifaMatchResult, { loading, data, error }) => {
                const hasUserSubmittedResult = hasSubmittedMatchResult(
                  match,
                  currentUser
                );

                return (
                  <FifaMatchPlayerResultForm
                    {...formProps}
                    match={match}
                    currentUser={currentUser}
                    acceptTwitchVideoUrl={true}
                    onSubmit={formModel =>
                      submitFifaMatchResult({
                        variables: {
                          input: {
                            ...formModel,
                            ownScore: Number(formModel.ownScore),
                            opponentScore: Number(formModel.opponentScore),
                            matchId: match.id,
                            playerId: currentUser.id
                          }
                        },
                        refetchQueries: [
                          {
                            query: FIFA_TOURNAMENT_DETAILS_QUERY,
                            variables: { urlSlug: tournamentUrlSlug }
                          }
                        ]
                      }).catch(resolveGraphQLSubmitErrors)
                    }
                    success={
                      hasUserSubmittedResult ||
                      (data && !!data.submitFifaMatchResult)
                    }
                    inProgress={loading}
                  />
                );
              }}
            </SubmitFifaMatchResultMutation>
          )}
        </ModalAlertDialog>
      )}
    </Card>
  );
}
