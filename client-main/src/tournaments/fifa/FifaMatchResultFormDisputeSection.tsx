import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import {
  Button,
  LinkLikeButton,
  ButtonIcon,
  DisputeIcon,
  FormElement,
  SelectField,
  TextAreaField
} from '@igg/common';
import { CardSection, CardContent, CardContentCell } from '../../shared/card';
import { FifaMatchDisputeReason } from '../types';
import { getFifaMatchDisputeReasonLabel } from '../tournamentHelpers';

const allowedDisputeReasons = [
  FifaMatchDisputeReason.GUEST_ADDED,
  FifaMatchDisputeReason.CUSTOM_TEAM,
  FifaMatchDisputeReason.CANT_FIND_GAMERTAG,
  FifaMatchDisputeReason.INCORRECT_GAMERTAG,
  FifaMatchDisputeReason.UNRESPONSIVE_OPPONENT,
  FifaMatchDisputeReason.DISCONNECTED_MATCH,
  FifaMatchDisputeReason.OPPONENT_DIDNT_REMATCH,
  FifaMatchDisputeReason.INCORRECT_GAMEMODE
];

const disputeReasonSelectOptions = Object.keys(FifaMatchDisputeReason)
  .filter(r => allowedDisputeReasons.includes(FifaMatchDisputeReason[r]))
  .map(r => ({
    value: r,
    label: getFifaMatchDisputeReasonLabel(FifaMatchDisputeReason[r])
  }));

export interface FifaMatchResultFormDisputeSectionProps {
  onCollapse?: () => void;
}

export function FifaMatchResultFormDisputeSection({
  onCollapse
}: FifaMatchResultFormDisputeSectionProps) {
  const [isFormExpanded, setFormExpanded] = useState(false);

  function toggleForm() {
    setFormExpanded(!isFormExpanded);
    if (isFormExpanded && typeof onCollapse === 'function') {
      onCollapse();
    }
  }

  return (
    <CardSection borderTop={true}>
      {isFormExpanded ? (
        <>
          <CardContent>
            <CardContentCell verticalAlignCenter={true}>
              <DisputeIcon />
            </CardContentCell>

            <CardContentCell main={true} verticalAlignCenter={true}>
              Open a dispute
            </CardContentCell>

            <CardContentCell alignEnd={true}>
              <Button small={true} inverse={true} onClick={toggleForm}>
                <ButtonIcon small={true}>
                  <IoMdClose />
                </ButtonIcon>
                <span>Dismiss</span>
              </Button>
            </CardContentCell>
          </CardContent>

          <CardContent>
            <CardContentCell main={true} stretch={true}>
              <FormElement>
                <SelectField small={true} name="disputeReason" label="Reason">
                  {disputeReasonSelectOptions.map(r => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </SelectField>
              </FormElement>

              <FormElement>
                <TextAreaField
                  name="disputeComment"
                  label="Comment"
                  placeholder="Tell us what happened"
                  rows={4}
                />
              </FormElement>
            </CardContentCell>
          </CardContent>
        </>
      ) : (
        <CardContent>
          <CardContentCell main={true} alignCenter={true}>
            <LinkLikeButton onClick={toggleForm}>
              <ButtonIcon>
                <DisputeIcon />
              </ButtonIcon>

              <span>Open a dispute</span>
            </LinkLikeButton>
          </CardContentCell>
        </CardContent>
      )}
    </CardSection>
  );
}
