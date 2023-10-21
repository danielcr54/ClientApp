import React from 'react';
import styled from '@emotion/styled';
import { Form, Field } from 'react-final-form';
import {
  FormErrorMap,
  SubmitButton,
  InputField,
  FormRow,
  FormCol,
  FieldLabel,
  FormElement
} from '@igg/common';
import {
  CardSection,
  CardContent,
  CardContentCell,
  CardMessage,
  CardMessageNote
} from '../../shared/card';
import { TimeLeftLabel } from '../../shared/TimeLeftLabel';
import { UserModel } from '../../core/types';
import { resolveMatchPlayers } from '../tournamentHelpers';
import { GameScoreBlock, GameScoreBlockGroup } from '../GameScoreBlock';
import { FifaMatchModel, FifaMatchDisputeReason } from '../types';
import { FifaMatchResultFormDisputeSection } from './FifaMatchResultFormDisputeSection';
import { MultiImageInput } from '../../shared/MultiImageInput';

// Styled helpers

const GameScoreInputContainer = styled('div')({
  width: 50
});

// Exported component

export interface FifaMatchPlayerResultFormModel {
  ownScore?: number;
  opponentScore?: number;
  screenshotUrls?: string[];
  disputeReason?: FifaMatchDisputeReason;
  disputeComment?: string;
  videoUrl?: string;
}

export function validateForm(formModel: FifaMatchPlayerResultFormModel) {
  const errors: FormErrorMap<FifaMatchPlayerResultFormModel> = {};

  if (typeof formModel.ownScore === 'undefined') {
    errors.ownScore = 'Please provide your own score';
  }

  if (typeof formModel.opponentScore === 'undefined') {
    errors.opponentScore = "Please provide opponent's score";
  }

  return errors;
}

const DEFAULT_FORM_STATE: FifaMatchPlayerResultFormModel = {
  ownScore: 0,
  opponentScore: 0
};

export interface FifaMatchPlayerResultFormProps {
  match: FifaMatchModel;
  currentUser: UserModel;
  formData?: FifaMatchPlayerResultFormModel;
  onSubmit: (formModel: FifaMatchPlayerResultFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
  acceptTwitchVideoUrl?: boolean;
}

export function FifaMatchPlayerResultForm({
  match,
  currentUser,
  inProgress,
  success,
  onSubmit,
  acceptTwitchVideoUrl
}: FifaMatchPlayerResultFormProps) {
  const { player, opponentPlayer } = resolveMatchPlayers(match, currentUser);

  return (
    <Form
      initialValues={DEFAULT_FORM_STATE}
      onSubmit={onSubmit}
      validate={validateForm}
      validateOnBlur={true}
    >
      {({ handleSubmit, values }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            <CardSection>
              <CardContent>
                <CardContentCell main={true}>
                  <GameScoreBlockGroup>
                    <GameScoreBlock
                      player={player}
                      renderScoreValueBlock={() => (
                        <GameScoreInputContainer>
                          <InputField
                            type="text"
                            small={true}
                            alignCenter={true}
                            name="ownScore"
                            autoComplete="off"
                          />
                        </GameScoreInputContainer>
                      )}
                    />

                    <GameScoreBlock
                      player={opponentPlayer}
                      renderScoreValueBlock={() => (
                        <GameScoreInputContainer>
                          <InputField
                            type="text"
                            small={true}
                            alignCenter={true}
                            name="opponentScore"
                            autoComplete="off"
                          />
                        </GameScoreInputContainer>
                      )}
                    />
                  </GameScoreBlockGroup>
                </CardContentCell>
              </CardContent>
            </CardSection>

            <CardSection>
              <CardContent>
                <CardContentCell main={true} stretch={true}>
                  <FormElement>
                    <Field name="screenshotUrls">
                      {({ input, meta }) => (
                        <MultiImageInput
                          value={input.value}
                          onChange={input.onChange}
                          meta={meta}
                          maxImages={3}
                          uploadUrl={`/fifa-match-screenshots/${match.id}`}
                          initialLabel="Upload match screenshot (optional)"
                          sublabel="Max 3 images, up to 25Mb each. Only JPG or PNG."
                          imageBorderRadius={5}
                        />
                      )}
                    </Field>
                  </FormElement>
                </CardContentCell>
              </CardContent>
            </CardSection>

            {acceptTwitchVideoUrl && (
              <CardSection borderTop={true}>
                <CardContent>
                  <CardContentCell main={true} stretch={true}>
                    <FormRow>
                      <FormCol>
                        <FieldLabel>Twitch Video</FieldLabel>
                        <InputField
                          type="text"
                          small={true}
                          placeholder="https://www.twitch.tv/videos/your_video_id"
                          name="videoUrl"
                          autoComplete="off"
                        />
                      </FormCol>

                      <FormCol />
                    </FormRow>
                  </CardContentCell>
                </CardContent>
              </CardSection>
            )}

            <FifaMatchResultFormDisputeSection
              onCollapse={() => {
                delete values.disputeReason;
                delete values.disputeComment;
              }}
            />

            <CardSection borderTop={true}>
              <CardContent>
                <CardContentCell main={true} verticalAlignCenter={true}>
                  <CardMessage hasSpacing={false}>
                    You have <TimeLeftLabel untilTime={match.finishTime} /> to
                    submit the scores
                    <CardMessageNote>
                      Not submitting scores will result in disqualification.
                    </CardMessageNote>
                  </CardMessage>
                </CardContentCell>

                <CardContentCell
                  main={true}
                  alignEnd={true}
                  verticalAlignCenter={true}
                >
                  <SubmitButton
                    inProgress={inProgress}
                    success={success}
                    progressText="Submitting..."
                    successText="Submitted!"
                  >
                    Submit result
                  </SubmitButton>
                </CardContentCell>
              </CardContent>
            </CardSection>
          </form>
        );
      }}
    </Form>
  );
}
