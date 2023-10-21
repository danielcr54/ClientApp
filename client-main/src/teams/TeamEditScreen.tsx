import React from 'react';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  ScreenContentFormContainer,
  LoadingScreen
} from '@igg/common';
import {
  resolveGraphQLSubmitErrors,
  getErrorMessage
} from '../shared/errorHelpers';
import TeamForm from './TeamForm';
import {
  UpdateTeamMutation,
  UpdateTeamFn
} from './mutations/UpdateTeamMutation';
import { TeamModel } from './types';
import { TeamDetailsQuery, TEAM_DETAILS_QUERY } from './TeamDetailsQuery';
import { RouteComponentProps } from 'react-router';

// TODO: Find a better and less repetitive way

function ensureDataShape({
  id,
  name,
  urlSlug,
  logoUrl,
  countryCode,
  languages,
  consoleIds
}: TeamModel) {
  return {
    id,
    name,
    urlSlug,
    logoUrl,
    countryCode,
    languages,
    consoleIds
  };
}

export interface TeamEditScreenRouteParams {
  urlSlug: string;
}

export interface TeamEditScreenProps {
  team: TeamModel;
  updateTeam: UpdateTeamFn;
  loading?: boolean;
  formError?: string;
  success?: boolean;
}

export function TeamEditScreen({
  team,
  updateTeam,
  loading,
  formError,
  success
}: TeamEditScreenProps) {
  return (
    <>
      <ScreenContentHeader>
        <ScreenContentHeading>Edit Team</ScreenContentHeading>
        <ScreenContentSubheading>
          Make any updates to your team!
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentFormContainer>
        <TeamForm
          isEdit={true}
          formData={team}
          inProgress={loading}
          formError={formError}
          success={success}
          onSubmit={formModel =>
            updateTeam({
              variables: { input: ensureDataShape(formModel) },
              refetchQueries: [
                {
                  query: TEAM_DETAILS_QUERY,
                  variables: { urlSlug: formModel.urlSlug }
                }
              ],
              awaitRefetchQueries: true
            }).catch(resolveGraphQLSubmitErrors)
          }
        />
      </ScreenContentFormContainer>
    </>
  );
}

export function TeamEditScreenConnected({
  match: {
    params: { urlSlug }
  }
}: RouteComponentProps<TeamEditScreenRouteParams>) {
  return (
    <TeamDetailsQuery urlSlug={urlSlug} renderLoading={() => <LoadingScreen />}>
      {team => (
        <UpdateTeamMutation>
          {(updateTeam, mutationResult) => {
            const { loading, data, error } = mutationResult;
            const updatedTeam =
              (data && data.updateTeam && data.updateTeam.team) || void 0;

            if (updatedTeam) {
              // TODO: Show some sort of success, maybe redirect, etc
            }

            return (
              <TeamEditScreen
                team={team}
                updateTeam={updateTeam}
                loading={loading}
                success={Boolean(data)}
                formError={getErrorMessage(
                  error,
                  'Unknown error has happened during the operation'
                )}
              />
            );
          }}
        </UpdateTeamMutation>
      )}
    </TeamDetailsQuery>
  );
}

export default TeamEditScreenConnected;
