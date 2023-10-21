import React, { Component } from 'react';
import styled from '@emotion/styled';
import { styleSettings, SpinnerIcon } from '@igg/common';
import { IoMdCamera, IoIosFolder } from 'react-icons/io';
import { ChatSendMutation, ChatSendFn } from './ChatMutation';

const { fonts, inputColors, colors, deviceScreenQuery } = styleSettings;

// TODO: Consider a possibility of adapting the regular Input for a reuse here

const ChatMessageFormRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  borderRadius: 3,
  backgroundColor: 'transparent'
});

const ChatMessageFormAction = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  padding: '6px 10px'
});

interface StyledChatMessageInputProps {
  focused?: boolean;
  filled?: boolean;
}

const StyledChatMessageInput = styled('input')(
  ({ focused }: StyledChatMessageInputProps) => ({
    padding: '16px 100px 16px 16px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: focused ? inputColors.borderFocus : inputColors.border,
    outline: 'none',
    fontFamily: fonts.main,
    fontSize: 13,
    lineHeight: 1.2,
    backgroundColor: focused ? inputColors.bgFocus : inputColors.bg,
    color: focused ? inputColors.textFocus : inputColors.text,
    transition: 'all 0.2s',

    '&::placeholder': {
      color: inputColors.placeholder,
      transition: 'all 0.2s'
    },

    '&:focus': {
      borderColor: inputColors.borderFocus,
      backgroundColor: inputColors.bgFocus,
      color: inputColors.textFocus,

      '&::placeholder': {
        opacity: 0.7
      }
    },

    '&:disabled': {
      borderColor: inputColors.borderDisabled,
      backgroundColor: inputColors.bgDisabled,
      color: inputColors.textDisabled
    },

    '&:not([type=checkbox]):not([type=file])': {
      width: '100%'
    }
  })
);

export const ChatMessageFormSubmitButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  width: 'auto',
  marginLeft: 5,
  border: 'none',
  outline: 'none',
  textTransform: 'uppercase',
  fontWeight: 500,
  fontSize: 14,
  backgroundColor: 'transparent',
  color: colors.white,
  cursor: 'pointer'
});

export const ChatMessageFormActionButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  fontSize: '160%',
  color: colors.white,
  backgroundColor: 'transparent',

  '&:not(:last-of-type)': {
    marginRight: 10
  },

  '&:disabled, &[disabled]': {
    color: 'grey'
  }
});

interface ChatMessageFormProps {
  onSubmit: (message?: string) => void;
  inProgress?: boolean;
  onAttachPhotoClick?: () => void;
  onWalletClick?: () => void;
}

interface ChatMessageFormState {
  message: string;
}

export class ChatMessageForm extends Component<
  ChatMessageFormProps,
  ChatMessageFormState
> {
  state = {
    message: ''
  };

  onSendMessage() {
    const { onSubmit } = this.props;
    const { message } = this.state;

    onSubmit(message);
    this.setState({
      message: ''
    });
  }

  onMessageChange(message: string) {
    this.setState({
      message
    });
  }

  onKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onSendMessage();
    }
  }

  render() {
    const { onAttachPhotoClick, onWalletClick } = this.props;
    const { message } = this.state;

    return (
      <ChatMessageFormRoot>
        <StyledChatMessageInput
          placeholder="Type something ..."
          type="text"
          onChange={e => this.onMessageChange(e.target.value)}
          onKeyPress={e => this.onKeyPress(e)}
          value={message}
        />
        <ChatMessageFormAction>
          <ChatMessageFormActionButton
            onClick={onAttachPhotoClick}
            disabled={true}
          >
            <IoMdCamera />
          </ChatMessageFormActionButton>
          <ChatMessageFormActionButton onClick={onWalletClick} disabled={true}>
            <IoIosFolder />
          </ChatMessageFormActionButton>
          <ChatMessageFormSubmitButton
            onClick={() => this.onSendMessage()}
            disabled={!message}
          >{`Send`}</ChatMessageFormSubmitButton>
        </ChatMessageFormAction>
      </ChatMessageFormRoot>
    );
  }
}

export interface ChatMessageFormConnectedProps {
  conversationId: string;
}

export function ChatMessageFormConnected({
  conversationId
}: ChatMessageFormConnectedProps) {
  return (
    <ChatSendMutation>
      {(sendMessage, { error, data }) => {
        return (
          <ChatMessageForm
            onSubmit={(message: string) =>
              sendMessage({
                variables: {
                  conversationId,
                  message
                }
              })
            }
          />
        );
      }}
    </ChatSendMutation>
  );
}

export default ChatMessageFormConnected;
