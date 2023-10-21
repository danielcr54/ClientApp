import React from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors } from '../SubmitErrors';
import { FieldError } from '../FieldError';
import { Input, InputProps } from './Input';

export interface InputFieldProps extends InputProps {
  name: string;
}

export function InputField({ name, ...inputProps }: InputFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <>
          <Input
            {...inputProps}
            name={input.name}
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
