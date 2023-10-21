import React, { FormEvent } from 'react';
import styled from '@emotion/styled';
import { IoIosSearch } from 'react-icons/io';
import { styleSettings, SpinnerIcon } from '@igg/common';

const { fonts, inputColors, deviceScreenQuery } = styleSettings;

// TODO: Consider a possibility of adapting the regular Input for a reuse here

const ChatSearchInputRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  width: '100%'
});

interface StyledChatSearchInputProps {
  focused?: boolean;
  filled?: boolean;
}

const StyledChatSearchInput = styled('input')(
  ({ focused }: StyledChatSearchInputProps) => ({
    padding: '6px 9px',
    fontSize: 11,
    lineHeight: 1.2,
    fontFamily: fonts.main,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: focused ? inputColors.borderFocus : inputColors.border,
    backgroundColor: focused ? inputColors.bgFocus : inputColors.bg,
    color: focused ? inputColors.textFocus : inputColors.text,
    outline: 'none',
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

export const ChatSearchInputIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 'auto',
  padding: '6px 6px',
  fontSize: 16,
  pointerEvents: 'none'
});

interface ChatSearchInputProps {
  value?: string;
  onChange?: (value?: string) => void;
  inProgress?: boolean;
  placeholder?: string;
}

export function ChatSearchInput({
  value,
  onChange,
  inProgress,
  placeholder
}: ChatSearchInputProps) {
  // TODO: Probably make a class instead
  function handleChange(e: FormEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(e.currentTarget.value);
    }
  }

  return (
    <ChatSearchInputRoot>
      <StyledChatSearchInput
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <ChatSearchInputIcon>
        {inProgress ? <SpinnerIcon size={11} /> : <IoIosSearch />}
      </ChatSearchInputIcon>
    </ChatSearchInputRoot>
  );
}

export default ChatSearchInput;
