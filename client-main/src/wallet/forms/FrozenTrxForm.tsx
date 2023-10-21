import React from 'react';
import { Form } from 'react-final-form';
import {
  FormErrorMap,
  FormElement,
  InputField,
  FormActions,
  SubmitButton
} from '@igg/common/lib';

export interface FrozenTrxModel {
  amount: number;
}

function validateForm(form: FrozenTrxModel) {
  const errors: FormErrorMap<FrozenTrxModel> = {};

  if (!form.amount) {
    errors.amount = 'Amount of TRX to freeze is required';
  }

  if (form.amount <= 0) {
    errors.amount = 'You must freeze at least 1 TRX';
  }

  return errors;
}

export interface FrozenTrxFormProps {
  onSubmit?: (form: FrozenTrxModel) => void;
  inProgress?: boolean;
  success?: boolean;
}

export class FrozenTrxForm extends React.Component<FrozenTrxFormProps> {
  handleFormSubmit = (form: FrozenTrxModel) => {
    const { onSubmit } = this.props;
    if (typeof onSubmit === 'function') onSubmit(form);
  };
  render() {
    const { handleFormSubmit } = this;
    const { inProgress, success } = this.props;

    return (
      <Form
        onSubmit={handleFormSubmit}
        validate={validateForm}
        validateOnBlur={true}
      >
        {({ handleSubmit }) => (
          <form noValidate={true} onSubmit={handleSubmit}>
            <p>Freeze TRX</p> {/* TODO: STYLE */}
            <FormElement>
              <InputField
                name="amount"
                type="number"
                label="Amount"
                placeholder="Amount"
                min={0}
              />
            </FormElement>
            <FormActions>
              <SubmitButton
                inProgress={inProgress}
                success={success}
                progressText="Freezing..."
                successText="TRX Froze"
              >
                FREEZE TRX
              </SubmitButton>
            </FormActions>
          </form>
        )}
      </Form>
    );
  }
}
