import React from 'react';
import { ChatContactModel } from './types';
import { UserModel } from '../core/types';

export const initialChatState: ChatViewContextInterface = {
  visible: false,
  currentContact: {
    user: {
      id: '',
      displayName: '',
      username: '',
      email: '',
      profile: {}
    }
  },
  open: () => {
    /**/
  },
  toggle: () => {
    /**/
  },
  close: () => {
    /**/
  }
};

export interface ChatViewContextInterface {
  visible: boolean;
  currentUser?: UserModel;
  currentContact: ChatContactModel;
  open: (contact: ChatContactModel) => void;
  toggle: () => void;
  close: () => void;
}

const ChatViewContext = React.createContext<ChatViewContextInterface>(
  initialChatState
);

export default ChatViewContext;
