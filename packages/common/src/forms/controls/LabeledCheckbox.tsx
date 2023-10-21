import React, { ReactNode, ComponentType } from 'react';
import styled from '@emotion/styled';
import { Checkbox, CheckboxStyledProps, CheckboxProps } from './Checkbox';

interface LabeledCheckboxStyledProp extends CheckboxStyledProps {
  labelTextSize?: number;
}

const LabeledCheckboxRoot = styled('label')(
  ({ labelTextSize, large }: LabeledCheckboxStyledProp) => ({
    display: 'flex',
    width: '100%',
    fontSize: labelTextSize ? labelTextSize : large ? 16 : 13
  })
);

const LabeledCheckboxStaticRoot = LabeledCheckboxRoot.withComponent('div');

const LabeledCheckboxControlWrapper = styled('div')({
  flexShrink: 0,

  '&:not(:last-of-type)': {
    marginRight: 12
  }
});

const LabeledCheckboxLabel = styled('div')({
  flex: 1,
  fontSize: '1em',
  userSelect: 'none'
});

export interface LabeledCheckboxProps
  extends CheckboxProps,
    LabeledCheckboxStyledProp {
  label?: ReactNode;
  renderLabel?: () => ReactNode;
  staticLabel?: boolean;
}

export function LabeledCheckbox({
  labelTextSize,
  label,
  renderLabel,
  staticLabel,
  ...checkboxProps
}: LabeledCheckboxProps) {
  const RootComponent: ComponentType<LabeledCheckboxStyledProp> = staticLabel
    ? LabeledCheckboxStaticRoot
    : LabeledCheckboxRoot;

  return (
    <RootComponent labelTextSize={labelTextSize} large={checkboxProps.large}>
      <LabeledCheckboxControlWrapper>
        <Checkbox {...checkboxProps} />
      </LabeledCheckboxControlWrapper>

      <LabeledCheckboxLabel>
        {typeof renderLabel === 'function' ? renderLabel() : label}
      </LabeledCheckboxLabel>
    </RootComponent>
  );
}

export default LabeledCheckbox;
