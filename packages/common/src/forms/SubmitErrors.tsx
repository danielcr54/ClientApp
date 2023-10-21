import React from 'react';
import { FieldMeta } from './types';
import FieldError from './FieldError';

export interface SubmitErrorsProps {
  fieldMeta: Partial<FieldMeta>;
}

export function SubmitErrors({ fieldMeta }: SubmitErrorsProps) {
  const { submitFailed, submitError } = fieldMeta;
  if (!submitFailed || !submitError) return null;

  const messages = submitError && (submitError as string[]);
  if (!messages || !messages.length) return null;

  return (
    <>
      {messages.map(message => (
        <FieldError key={message}>{message}</FieldError>
      ))}
    </>
  );
}

SubmitErrors.displayName = 'SubmitErrors';

export default SubmitErrors;
