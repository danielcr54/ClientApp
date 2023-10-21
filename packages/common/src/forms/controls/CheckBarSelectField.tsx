import React from 'react';
import { Field } from 'react-final-form';
import { SubmitErrors } from '../SubmitErrors';
import { FieldError } from '../FieldError';
import { CheckBarSelect, CheckBarSelectProps } from './CheckBarSelect';

export interface CheckBarSelectFieldProps<TValue>
  extends CheckBarSelectProps<TValue> {
  name: string;
}

export function CheckBarSelectField<TValue>({
  name,
  ...checkBarSelectProps
}: CheckBarSelectFieldProps<TValue>) {
  return (
    <Field name={name} type="checkbox">
      {({ input, meta }) => (
        <>
          <CheckBarSelect
            {...checkBarSelectProps}
            value={input.value}
            onChange={input.onChange}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
          />

          <SubmitErrors fieldMeta={meta} />
          {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
        </>
      )}
    </Field>
  );
}
