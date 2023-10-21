import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors, deviceScreenQuery } = styleSettings;

interface LabeledTextBlockStyledProps {
  alignCenter?: boolean;
  alignEnd?: boolean;
  large?: boolean;
  noWrap?: boolean;
  brightLabel?: boolean;
}

const LabeledTextBlockRoot = styled('div')(
  ({ alignCenter, alignEnd, noWrap }: LabeledTextBlockStyledProps) => ({
    fontSize: 13,
    textAlign: alignEnd ? 'right' : alignCenter ? 'center' : 'left'
  })
);

const LabeledTextBlockLabel = styled('div')(
  ({ noWrap, brightLabel }: LabeledTextBlockStyledProps) => ({
    marginBottom: 2,
    fontSize: 13,
    color: brightLabel ? colors.white : 'rgba(255, 255, 255, 0.55)',
    whiteSpace: noWrap ? 'nowrap' : 'normal'
  })
);

const LabeledTextBlockText = styled('div')(
  ({ large, noWrap }: LabeledTextBlockStyledProps) => ({
    fontSize: 15,
    color: colors.white,
    whiteSpace: noWrap ? 'nowrap' : 'normal',

    [`@media ${deviceScreenQuery.small}`]: {
      fontSize: large ? 18 : 15
    }
  })
);

export interface LabeledTextBlockProps {
  label?: string;
  text?: string;
  alignCenter?: boolean;
  alignEnd?: boolean;
  textFirst?: boolean;
  brightLabel?: boolean;
  large?: boolean;
  noWrap?: boolean;
}

export function LabeledTextBlock({
  label,
  text,
  textFirst,
  brightLabel,
  alignCenter,
  alignEnd,
  large,
  noWrap
}: LabeledTextBlockProps) {
  return (
    <LabeledTextBlockRoot
      alignCenter={alignCenter}
      alignEnd={alignEnd}
      large={large}
    >
      {text && textFirst && (
        <LabeledTextBlockText large={large} noWrap={noWrap}>
          {text}
        </LabeledTextBlockText>
      )}
      {label && (
        <LabeledTextBlockLabel
          large={large}
          noWrap={noWrap}
          brightLabel={brightLabel}
        >
          {label}
        </LabeledTextBlockLabel>
      )}
      {text && !textFirst && (
        <LabeledTextBlockText large={large} noWrap={noWrap}>
          {text}
        </LabeledTextBlockText>
      )}
    </LabeledTextBlockRoot>
  );
}
