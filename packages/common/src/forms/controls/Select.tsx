import React, { SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown } from 'react-icons/io';
import { inputColors } from '../../styleSettings';
import { FloatLabel } from '../FloatLabel';
import {
  InputRoot,
  StyledInput,
  InputEndAddon,
  StyledInputProps
} from './Input';

const SelectRoot = InputRoot;

const SelectAddon = styled(InputEndAddon)({
  fontSize: 18
});

interface StyledSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    StyledInputProps {
  hasLabel?: boolean;
  focused?: boolean;
  filled?: boolean;
}

const StyledSelect = styled(StyledInput.withComponent('select'))(
  ({ filled }: StyledSelectProps) => ({
    color: filled ? inputColors.text : 'transparent',
    appearance: 'none',

    '&:focus': {
      borderColor: 'transparent',
      backgroundColor: inputColors.bgFocus
    }
  })
);

export interface SelectProps extends StyledSelectProps {
  label?: string;
  placeholder?: string;
  focused?: boolean;
  filled?: boolean;
  value?: any;
}

export function Select({
  label,
  placeholder,
  focused,
  filled,
  value,
  small,
  ...selectElementProps
}: SelectProps) {
  const _filled = filled || value;

  return (
    <SelectRoot>
      <StyledSelect
        {...selectElementProps}
        hasLabel={!!label}
        focused={focused}
        filled={_filled}
        value={value}
        small={small}
      />
      {label && (
        <FloatLabel small={small} active={focused || _filled}>
          {label}
        </FloatLabel>
      )}
      <SelectAddon small={small}>
        <IoIosArrowDown />
      </SelectAddon>
    </SelectRoot>
  );
}
