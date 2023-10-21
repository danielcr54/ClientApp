import React, { InputHTMLAttributes, KeyboardEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import { IoIosSearch } from 'react-icons/io';
import { styleSettings, SpinnerIcon } from '@igg/common';

const { fonts, inputColors, deviceScreenQuery } = styleSettings;

const SearchFilterRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  width: '100%',

  [`@media ${deviceScreenQuery.small}`]: {
    minWidth: 190
  }
});

interface SearchFilterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  focused?: boolean;
  filled?: boolean;
}

const SearchFilterInput = styled('input')(
  ({ focused }: SearchFilterInputProps) => ({
    padding: '6px 10px',
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

export const SearchFilterInputIcon = styled('div')({
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

interface SearchFilterProps {
  value?: string;
  onChange?: (value?: string) => void;
  onSubmit?: (value?: string) => void;
  inProgress?: boolean;
  placeholder?: string;
}

export function SearchFilter({
  value,
  onChange,
  onSubmit,
  inProgress,
  placeholder
}: SearchFilterProps) {
  // TODO: Probably make a class instead
  function handleChange(e: FormEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(e.currentTarget.value);
    }
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.which === 13 && typeof onSubmit === 'function') {
      onSubmit(e.currentTarget.value);
    }
  }

  return (
    <SearchFilterRoot>
      <SearchFilterInput
        value={value}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        placeholder={placeholder}
        data-cy="aut-i-search"
      />
      <SearchFilterInputIcon>
        {inProgress ? <SpinnerIcon size={11} /> : <IoIosSearch />}
      </SearchFilterInputIcon>
    </SearchFilterRoot>
  );
}
