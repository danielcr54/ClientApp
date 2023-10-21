import React, { ReactNode } from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors } from '../SubmitErrors';
import { FieldError } from '../FieldError';
import { Select, SelectProps } from './Select';

export interface SelectFieldProps extends SelectProps {
  children?: ReactNode;
  name: string;
}

export function SelectField({
  children,
  name,
  ...inputProps
}: SelectFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <>
          <Select
            {...inputProps}
            name={name}
            focused={meta.active}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            value={input.value}
            onChange={input.onChange}
          >
            {children}
          </Select>
          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}
