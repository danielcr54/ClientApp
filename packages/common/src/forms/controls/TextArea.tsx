import React, { TextareaHTMLAttributes, ReactNode, ComponentType } from 'react';
import styled from '@emotion/styled';
import { fonts, inputColors, inputSpacing } from '../../styleSettings';
import { FloatLabel } from '../FloatLabel';

// Styled helpers

interface TextAreaStyledProps {
  small?: boolean;
  alignCenter?: boolean;
}

export const TextAreaRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  width: '100%'
});

export interface StyledTextAreaProps extends TextAreaStyledProps {
  hasLabel?: boolean;
  focused?: boolean;
  filled?: boolean;
  width?: number;
}

export const StyledTextArea = styled('textarea')(
  ({
    hasLabel,
    focused,
    filled,
    small,
    width,
    alignCenter
  }: StyledTextAreaProps) => {
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
      }
    };
  }
);

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextAreaStyledProps {
  type?: string;
  label?: string;
  placeholder?: string;
  focused?: boolean;
  filled?: boolean;
  value?: any;
  width?: number;
  icon?: ComponentType<any>;
  renderIcon?: () => ReactNode;
}

export function TextArea({
  type,
  label,
  placeholder,
  focused,
  filled,
  value,
  icon,
  renderIcon,
  small,
  width,
  ...inputElementProps
}: TextAreaProps) {
  const IconComponent = icon;
  const _filled = filled || value;

  return (
    <TextAreaRoot>
      <StyledTextArea
        {...inputElementProps}
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
    </TextAreaRoot>
  );
}
