import { ApolloError } from 'apollo-client';

export const defaultValidationMessage = `
  Some form data appears to be incorrect.
  Please see the individual fields error messages below
  for instructions.
`;

/**
 * Convert an array of field errors to `react-final-form`'s
 * `submitErrors` format.
 *
 * @param fieldErrors Individual field errors from
 * the 'unprocessable_entity' error response
 */
export function toSubmitErrors(fieldErrors: any[]) {
  if (!fieldErrors) return void 0;
  return fieldErrors.reduce((acc: any, current: any) => {
    acc[current.field] = current.messages;
    return acc;
  }, {});
}

/**
 * Extracts the submission error (the one with a `unprocessable_entity` type)
 * from GraphQL mutation error (`ApolloError` instance) and resolves its data
 * for `react-final-form` to consume as `submitErrors`.
 * Further rejects with the original error if there are no validation errors
 * to handle.
 *
 * @param error An `ApolloError` instance representing GraphQL error.
 */
export function resolveGraphQLSubmitErrors(error: ApolloError) {
  if (!error) return Promise.reject(error);

  const errors = error.graphQLErrors || [];

  if (errors.length && (errors[0] as any).type === 'unprocessable_entity') {
    const submitErrors = toSubmitErrors((errors[0] as any).errors);
    return Promise.resolve(submitErrors);
  }

  return Promise.reject(error);
}

/**
 * Extracts the error message from the generic error
 * (`ApolloError` instance is covered) and resolves
 *
 * @param error An instance of `Error` or  `ApolloError` representing the error.
 */
export function getErrorMessage(
  error?: Error | ApolloError,
  fallbackMessage: string = 'Unknown error has happened'
) {
  if (!error) return void 0;

  if (error instanceof ApolloError) {
    const graphQlErrors = error.graphQLErrors;
    if (graphQlErrors && graphQlErrors[0] && graphQlErrors[0].message) {
      return graphQlErrors[0].message;
    }
  }

  return error.message || fallbackMessage;
}
