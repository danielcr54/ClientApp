import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';

export const REMOVE_NOTIFICATIONS_MUTATION = gql`
  mutation RemoveNotification($notificationId: String!) {
    removeNotification(notificationId: $notificationId)
  }
`;

export type RemoveNotificationMutationFn = MutationFn<
  { removeNotification: string },
  { notificationId: string }
>;

export interface RemoveNotificationMutationProps {
  children: (
    mutationFn: RemoveNotificationMutationFn,
    mutationResult: MutationResult<{ removeNotification: string }>
  ) => ReactNode;
}

export function RemoveNotificationMutation({ children }: RemoveNotificationMutationProps) {
  return <Mutation mutation={REMOVE_NOTIFICATIONS_MUTATION}>{children}</Mutation>;
}

export default RemoveNotificationMutation;
