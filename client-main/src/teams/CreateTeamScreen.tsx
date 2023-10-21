import React from 'react';
import { Redirect } from 'react-router';
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
import { UserInfoQuery } from '../core/UserInfoQuery';
import { UserModel } from '../core/types';
import TeamForm from './TeamForm';
import TeamCreateTronLinkPayment from './TeamCreateTronLinkPayment';
import {
  CreateTeamMutation,
  CreateTeamFn
} from './mutations/CreateTeamMutation';

export interface CreateTeamScreenProps {
  currentUser: UserModel;
  createTeam: CreateTeamFn;
  loading?: boolean;
  formError?: string;
}

export function CreateTeamScreen({
  currentUser,
  createTeam,
  loading,
  formError
}: CreateTeamScreenProps) {
  return (
    <>
      <ScreenContentHeader>
        <ScreenContentHeading>Create a Team</ScreenContentHeading>
        <ScreenContentSubheading>
          Establish your team and recruit Galacticans to conquer the IGGalaxy!
        </ScreenContentSubheading>
      </ScreenContentHeader>

      <ScreenContentFormContainer>
        <TeamForm
          isEdit={false}
          inProgress={loading}
          formError={formError}
          // teamCost={100_000}
          onSubmit={formModel =>
            createTeam({
              variables: { input: formModel }
            }).catch(resolveGraphQLSubmitErrors)
          }
        />
        { !currentUser.canCreateTeam &&
          <TeamCreateTronLinkPayment />
        }
      </ScreenContentFormContainer>
    </>
  );
}

export function CreateTeamScreenConnected() {
  return (
    <CreateTeamMutation>
      {(createTeam, mutationResult) => {
        const { loading, data, error } = mutationResult;
        const createdTeam =
          (data && data.createTeam && data.createTeam.team) || void 0;

        if (createdTeam) {
          return <Redirect to={`/my-team`} />;
        }

        return (
          <UserInfoQuery renderLoading={() => <LoadingScreen />}>
            {userInfo => (
              <CreateTeamScreen
                currentUser={userInfo}
                createTeam={createTeam}
                loading={loading}
                formError={getErrorMessage(
                  error,
                  'Unknown error has happened during the operation'
                )}
              />
            )}
          </UserInfoQuery>
        );
      }}
    </CreateTeamMutation>
  );
}

export default CreateTeamScreenConnected;
