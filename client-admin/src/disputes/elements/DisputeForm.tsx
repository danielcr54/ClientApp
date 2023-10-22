import React, { Component } from 'react';
import { Form } from 'react-final-form';
import {
  FormElement,
  InputField,
  FormErrorMap,
  SubmitButton,
  FormError,
} from '@igg/common';
import styled from '@emotion/styled-base';
import { ResolveDisputeFormModel } from 'disputes/states/types';
import { UserAvatar } from 'shared/UserAvatar';
import { FifaMatchModel } from 'disputes/types';
import { ResolveDisputeMutation } from 'disputes/mutations/ResolveDisputeMutation';
import { FIFA_MATCHES_DISPUTES_QUERY } from 'disputes/FifaMatchDisputesQuery';
import ResolveDisputeStateContainer from 'disputes/states/ResolveDisputesStateContainer';

export const FormNotes = styled(FormElement)({
  marginRight: 20
});

export const ScoreLimiter = styled('div')({
  width: 150
});

export const FormContainer = styled('div')({
  display: 'flex',
  marginBottom: 20
});

export const SubmitAndScoreContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: 2000
});

export const ScoreContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center'
});

export function validateForm(formModel: ResolveDisputeFormModel) {
  const errors: FormErrorMap<ResolveDisputeFormModel> = {};
  return errors;
}

export interface DisputeFormProps {
  formData?: ResolveDisputeFormModel;
  onSubmit: (resolveDisputeFormModel: ResolveDisputeFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  formError?: string;
  fifaMatch: FifaMatchModel;
  resolveDisputeStateContainer: ResolveDisputeStateContainer;
}

export class DisputeForm extends Component<DisputeFormProps> {
  render() {
    return (
      <Form
        initialValues={this.props.formData}
        onSubmit={this.props.onSubmit}
        validate={validateForm}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            {this.props.formError && (
              <FormError title="Resolving dispute failed">
                {this.props.formError}
              </FormError>
            )}

            <FormContainer>
              <SubmitAndScoreContainer>
                <FormNotes>
                  <InputField name="disputeResolutionNote" label="Notes" />
                </FormNotes>
                <ScoreContainer>
                  <UserAvatar
                    imageUrl={this.props.fifaMatch.homePlayer.profile.avatarUrl}
                    size={55}
                  />
                  <ScoreLimiter>
                    <InputField name="homeScore" label="Home Score" />
                  </ScoreLimiter>
                  <div>
                    :
                  </div>
                  <ScoreLimiter>
                    <InputField name="awayScore" label="Away Score" />
                  </ScoreLimiter>
                  <UserAvatar
                    imageUrl={this.props.fifaMatch.awayPlayer.profile.avatarUrl}
                    size={55}
                  />
                </ScoreContainer>
              </SubmitAndScoreContainer>

              <SubmitButton
                disabled={false}
                inProgress={this.props.inProgress}
                success={this.props.success}
                progressText="Submitting..."
                successText="Submitted"
                glow={true}
                block={true}
                secondary={true}
              >
                Submit
              </SubmitButton>
            </FormContainer>
          </form>
        )}
      </Form>
    );
  }
}

export default DisputeForm;
