import { UserModel } from '../core/types';

export interface ChatContactModel {
  conversationId?: string;
  user: UserModel;
  online?: boolean;
  lastSeenAt?: Date;
  unreadCount?: number;
}

export interface ChatConversationModel {
  id: string;
  fromUserId: string;
  conversationId: string;
  type: string;
  message: string;
  createdAt?: Date;
}
