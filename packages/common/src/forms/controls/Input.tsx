import React, { InputHTMLAttributes, ReactNode, ComponentType } from 'react';
import styled from '@emotion/styled';
import { fonts, inputColors, inputSpacing, colors } from '../../styleSettings';
import { FloatLabel } from '../FloatLabel';

// Styled helpers

interface InputStyledProps {
  small?: boolean;
  alignCenter?: boolean;
}

export const InputRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  width: '100%'
});

export interface InputEndAddonProps extends InputStyledProps {
  interactive?: boolean;
}

export const InputEndAddon = styled('div')(
  ({ interactive, small }: InputEndAddonProps) => {
    const spacing = inputSpacing[small ? 'small' : 'default'];

    return {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: 'auto',
      padding: `${spacing.paddingY}px ${spacing.addonPaddingX}px`,
      fontSize: 22,
      pointerEvents: interactive ? 'inherit' : 'none'
    };
  }
);

export interface StyledInputProps extends InputStyledProps {
  hasLabel?: boolean;
  focused?: boolean;
  filled?: boolean;
  width?: number;
}

export const StyledInput = styled('input')(
  ({
    hasLabel,
    focused,
    filled,
    small,
    width,
    alignCenter
  }: StyledInputProps) => {
    const spacing = inputSpacing[small ? 'small' : 'default'];

    // Paddings adjustments
    const floatedLabelPaddingTop =
      spacing.paddingY + spacing.floatLabelPaddingOffset;
    const floatedLabelPaddingBottom =
      spacing.paddingY - spacing.floatLabelPaddingOffset;

    const defaultPaddings = `${spacing.paddingY}px ${spacing.paddingX}px`;
    const floatedLabelPaddings = `${floatedLabelPaddingTop}px ${
      spacing.paddingX
    }px ${floatedLabelPaddingBottom}px`;

    return {
      width: width ? width : '100%',
      padding:
        hasLabel && (focused || filled)
          ? floatedLabelPaddings
          : defaultPaddings,
      fontSize: spacing.fontSize || 15,
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
      textAlign: alignCenter ? 'center' : 'left',

      '&::placeholder': {
        color: inputColors.placeholder,
        opacity: focused ? 1 : hasLabel ? 0 : 1,
        transition: 'all 0.2s'
      },

      '&:focus': {
        borderColor: inputColors.borderFocus,
        backgroundColor: inputColors.bgFocus,
        color: inputColors.textFocus,
        padding: hasLabel ? floatedLabelPaddings : defaultPaddings,

        '&::placeholder': {
          opacity: 1
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
    };
  }
);

export const InputIconLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  color: colors.white
});

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputStyledProps {
  type?: string;
  label?: string;
  placeholder?: string;
  focused?: boolean;
  filled?: boolean;
  value?: any;
  width?: number;
  icon?: ComponentType<any>;
  iconLink?: string;
  renderIcon?: () => ReactNode;
}

export function Input({
  type,
  label,
  placeholder,
  focused,
  filled,
  value,
  icon,
  iconLink,
  renderIcon,
  small,
  width,
  ...inputElementProps
}: InputProps) {
  const IconComponent = icon;
  const _filled = filled || value;

  return (
    <InputRoot>
      <StyledInput
        {...inputElementProps}
        type={type || 'text'}
        placeholder={placeholder}
        hasLabel={!!label}
        focused={focused}
        filled={_filled}
        value={value}
        small={small}
        width={width}
      />
      {label && (
        <FloatLabel active={focused || _filled} small={small}>
          {label}
        </FloatLabel>
      )}

      {typeof renderIcon === 'function' ? (
        <InputEndAddon small={small}>{renderIcon()}</InputEndAddon>
      ) : IconComponent ? (
        <InputEndAddon small={small} interactive={!!iconLink}>
          {iconLink ? (
            <InputIconLink href={iconLink} target="_blank">
              <IconComponent />
            </InputIconLink>
          ) : (
            <IconComponent />
          )}
        </InputEndAddon>
      ) : null}
    </InputRoot>
  );
}
