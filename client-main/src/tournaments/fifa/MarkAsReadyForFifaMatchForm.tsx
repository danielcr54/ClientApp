import React from 'react';
import { Form } from 'react-final-form';
import {
  FormActions,
  FormElement,
  FormErrorMap,
  SubmitButton,
  InputField,
  FormActionsContent,
  ModalState,
  Modal,
  LinkLikeButton
} from '@igg/common';
import YouTubeStreamingGuideModalContent from './YouTubeStreamingGuideModalContent';

export interface MarkAsReadyForFifaMatchFormModel {
  streamUrl?: string;
}

export function validateForm(formModel: MarkAsReadyForFifaMatchFormModel) {
  const errors: FormErrorMap<MarkAsReadyForFifaMatchFormModel> = {};

  if (!formModel.streamUrl) {
    errors.streamUrl = 'Please provide a stream URL (YouTube, Twitch or Mixer)';
  }

  return errors;
}

export interface MarkAsReadyForFifaMatchFormProps {
  formData?: any;
  onSubmit: (formModel: MarkAsReadyForFifaMatchFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
}

export function MarkAsReadyForFifaMatchForm({
  formData,
  inProgress,
  success,
  onSubmit
}: MarkAsReadyForFifaMatchFormProps) {
  return (
    <Form
      initialValues={formData}
      onSubmit={onSubmit}
      validate={validateForm}
      validateOnBlur={true}
    >
      {({ handleSubmit }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            <FormElement>
              <InputField
                name="streamUrl"
                type="text"
                label="Stream URL (YouTube, Twitch or Mixer)"
                small={true}
              />
            </FormElement>

            <FormActions>
              <ModalState>
                {({ isOpen, open, close }) => (
                  <>
                    <LinkLikeButton onClick={open} style={{ fontSize: 12 }}>
                      HELP
                    </LinkLikeButton>

                    <Modal isOpen={isOpen} onRequestClose={close}>
                      <YouTubeStreamingGuideModalContent />
                    </Modal>
                  </>
                )}
              </ModalState>
              <FormActionsContent alignEnd={true} verticalAlignCenter={true}>
                <SubmitButton
                  inProgress={inProgress}
                  success={success}
                  progressText="Processing..."
                  successText="Ready!"
                >
                  Ready to join
                </SubmitButton>
              </FormActionsContent>
            </FormActions>
          </form>
        );
      }}
    </Form>
  );
}
