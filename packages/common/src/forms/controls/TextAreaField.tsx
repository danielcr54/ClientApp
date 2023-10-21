import React from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors } from '../SubmitErrors';
import { FieldError } from '../FieldError';
import { TextArea, TextAreaProps } from './TextArea';

export interface TextAreaFieldProps extends TextAreaProps {
  name: string;
}

export function TextAreaField({ name, ...inputProps }: TextAreaFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <>
          <TextArea
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
