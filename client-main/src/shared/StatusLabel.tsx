import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

export const StatusLabelBadge = styled('div')({
  display: 'inline-block',
  padding: '2px 6px',
  fontSize: 13,
  fontWeight: 400,
  borderRadius: 2,
  backgroundColor: '#73608e',
  color: colors.white,
  textTransform: 'uppercase',

  '&:not(:last-child)': {
    marginRight: 10
  }
});

export interface LabelTextProps {
  text?: string;
}

export function StatusLabel({ text }: LabelTextProps) {
  return <StatusLabelBadge>{text}</StatusLabelBadge>;
}
