import { MutationProps } from 'react-apollo';

export type CustomMutationProps<TData = any, TVariables = any> = Pick<
  MutationProps<TData, TVariables>,
  Exclude<keyof MutationProps<TData, TVariables>, 'mutation'>
>;
