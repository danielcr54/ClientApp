import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { ChatConversationModel, ChatContactModel } from './types';
import { ChatUserAvatar } from './ChatUserAvatar';

const { colors } = styleSettings;

interface ChatMessageListItemRootProps {
  alignLeft?: boolean;
}

const ChatMessageListItemRoot = styled('div')(
  ({ alignLeft }: ChatMessageListItemRootProps) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: alignLeft ? 'flex-start' : 'flex-end',
    marginBottom: 30
  })
);

const StyledChatUserAvatar = styled(ChatUserAvatar)({
  marginRight: 10
});

interface ChatMessageContentProps {
  sent?: boolean;
}

const ChatMessageContent = styled('div')(
  ({ sent }: ChatMessageContentProps) => ({
    maxWidth: '60%',
    padding: 10,
    borderRadius: 5,
    lineHeight: '1.6',
    backgroundColor: sent ? colors.main : colors.lighterDark,
    color: colors.white
  })
);

export interface ChatMessageListItemProps {
  contact: ChatContactModel;
  conversation: ChatConversationModel;
}

export function ChatMessageListItem({
  contact,
  conversation
}: ChatMessageListItemProps) {
  const alignLeft = contact.user.id === conversation.fromUserId;
  return (
    <ChatMessageListItemRoot alignLeft={alignLeft}>
      {
        alignLeft &&
        <StyledChatUserAvatar hideStatus={true} chatUser={contact} size={24} />
      }
      <ChatMessageContent sent={!alignLeft}>
        {conversation.message}
      </ChatMessageContent>
    </ChatMessageListItemRoot>
  );
}

export default ChatMessageListItem;
