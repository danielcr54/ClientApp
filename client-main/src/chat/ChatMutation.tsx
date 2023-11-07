import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { ChatConversationModel } from './types';

const CHAT_INIT_MUTATION = gql`
  mutation InitConversation($input: String!) {
    initConversation(userId: $input)
  }
`;

const CHAT_SEND_MUTATION = gql`
  mutation SendMesssage($conversationId: String!, $message: String!) {
    sendMessage(conversationId: $conversationId, message: $message) {
      id
      fromUserId
      conversationId
      type
      message
    }
  }
`;

const CHAT_LATEST_MESSAGE_MUTATION = gql`
  mutation SetLatestMessageRead($conversationId: String!, $messageId: String!) {
    setLatestMessageRead(conversationId: $conversationId, messageId: $messageId)
  }
`;

/**
 * Chat Init Mutation
 */
export type ChatInitFn = MutationFn<
  { initConversation: string },
  { input: string }
>;

export interface ChatInitMutationProps {
  children: (
    mutationFn: ChatInitFn,
    mutationResult: MutationResult<{ initConversation: string }>
  ) => ReactNode;
}

export function ChatInitMutation({ children }: ChatInitMutationProps) {
  return <Mutation mutation={CHAT_INIT_MUTATION}>{children}</Mutation>;
}

/**
 * Chat Send Mutation
 */
export type ChatSendFn = MutationFn<
  { sendMessage: ChatConversationModel },
  { conversationId: string, message: string }
>;

export interface ChatSendMutationProps {
  children: (
    mutationFn: ChatSendFn,
    mutationResult: MutationResult<{ sendMessage: ChatConversationModel }>
  ) => ReactNode;
}

export function ChatSendMutation({ children }: ChatSendMutationProps) {
  return <Mutation mutation={CHAT_SEND_MUTATION}>{children}</Mutation>;
}

/**
 * Chat Set Latest Message Mutation
 */
export type ChatLatestMessageFn = MutationFn<
  { setLatestMessageRead: string },
  { conversationId: string, messageId: string }
>;

export interface ChatLatestMessageMutationProps {
  children: (
    mutationFn: ChatLatestMessageFn,
    mutationResult: MutationResult<{ setLatestMessageRead: string }>
  ) => ReactNode;
}

export function ChatLatestMessageMutation({ children }: ChatLatestMessageMutationProps) {
  return <Mutation mutation={CHAT_LATEST_MESSAGE_MUTATION}>{children}</Mutation>;
}
