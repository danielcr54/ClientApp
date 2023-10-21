import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { inputSpacing, colors } from '../../styleSettings';

export interface CheckBarStyledProps {
  small?: boolean;
  xsmall?: boolean;
  selected?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

const CheckBarRoot = styled('div')(
  ({ selected, readonly, disabled }: CheckBarStyledProps) => {
    const defaultBgColor = '#393350';
    const defaultBgColorValue = readonly
      ? '#2c273f'
      : selected
      ? colors.main
      : defaultBgColor;

    return {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: readonly ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      borderRadius: 3,
      backgroundColor: defaultBgColorValue,
      color: disabled ? '#8175b1' : colors.white,
      cursor: !disabled && !readonly ? 'pointer' : 'default',
      transition: 'all 0.15s',

      '&:not(:last-of-type)': {
        marginBottom: 10
      },

      '&:hover': {
        // Old backgroundColor: #9853e0
        backgroundColor:
          !selected && !disabled && !readonly ? '#502c77' : defaultBgColorValue
      }
    };
  }
);

const CheckBarLabel = styled('div')(
  ({ small, xsmall }: CheckBarStyledProps) => {
    const spacing =
      inputSpacing[xsmall ? 'xsmall' : small ? 'small' : 'default'];

    return {
      flex: 1,
      padding: `${spacing.paddingY + 3}px ${spacing.paddingX}px`,
      fontSize: xsmall ? 12 : small ? 13 : 15
    };
  }
);

const CheckBarAddon = styled('div')(
  ({ selected, small, xsmall }: CheckBarStyledProps) => {
    const spacing =
      inputSpacing[xsmall ? 'xsmall' : small ? 'small' : 'default'];

    return {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${spacing.paddingY - 3}px ${spacing.paddingX - 8}px`,
      paddingLeft: 0,
      fontSize: xsmall ? 19 : small ? 22 : 27,
      lineHeight: 1,
      opacity: selected ? 1 : 0,
      transition: 'all 0.15s'
    };
  }
);

export interface CheckBarChangeData {
  value?: any;
  selected: boolean;
}

export interface CheckBarProps extends CheckBarStyledProps {
  value?: any;
  selected?: boolean;
  onChange?: (data: CheckBarChangeData) => void;
  children?: ReactNode;
}

export function CheckBar({
  children,
  value,
  onChange,
  ...styledProps
}: CheckBarProps) {
  const { selected, disabled, readonly } = styledProps;
  const active = !disabled && !readonly;

  function handleClick() {
    if (typeof onChange === 'function') {
      onChange({ value, selected: !selected });
    }
  }

  return (
    <CheckBarRoot {...styledProps} onClick={active ? handleClick : void 0}>
      <CheckBarLabel {...styledProps}>{children}</CheckBarLabel>

      <CheckBarAddon {...styledProps}>
        <IoIosCheckmarkCircle />
      </CheckBarAddon>
    </CheckBarRoot>
  );
}
