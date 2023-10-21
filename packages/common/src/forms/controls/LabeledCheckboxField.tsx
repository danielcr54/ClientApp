import React from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors } from '../SubmitErrors';
import { FieldError } from '../FieldError';
import { LabeledCheckbox, LabeledCheckboxProps } from './LabeledCheckbox';

export interface LabeledCheckboxFieldProps extends LabeledCheckboxProps {
  name: string;
}

export function LabeledCheckboxField({
  name,
  ...labeledCheckboxProps
}: LabeledCheckboxFieldProps) {
  return (
    <Field name={name} type="checkbox">
      {({ input, meta }) => (
        <>
          <LabeledCheckbox
            {...labeledCheckboxProps}
            name={input.name}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            value={input.value}
            checked={input.checked}
            onChange={input.onChange}
            focused={meta.active}
          />

          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}

export default LabeledCheckboxField;
