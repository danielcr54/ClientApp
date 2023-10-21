import React from 'react';
import { Field } from 'react-final-form';
import { DateInput, DateInputProps } from './DateInput';
import { SubmitErrors } from '../SubmitErrors';
import FieldError from '../FieldError';

export interface DateInputFieldProps extends DateInputProps {
  name: string;
}

export function DateInputField({ name, ...inputProps }: DateInputFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <>
          <DateInput
            {...inputProps}
            focused={meta.active}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            value={input.value}
            onChange={input.onChange}
          />

          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}
