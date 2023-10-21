import React, { ReactNode } from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors, FieldError } from '@igg/common';
import { AdvancedSelect, AdvancedSelectProps } from './AdvancedSelect';

export interface AdvancedSelectFieldProps extends AdvancedSelectProps {
  children?: ReactNode;
  name: string;
}

export function AdvancedSelectField({
  children,
  name,
  ...inputProps
}: AdvancedSelectFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <>
          <AdvancedSelect
            {...inputProps}
            focused={meta.active}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            value={input.value}
            onChange={input.onChange}
          >
            {children}
          </AdvancedSelect>

          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}

export default AdvancedSelectField;
