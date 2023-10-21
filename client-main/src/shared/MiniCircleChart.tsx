import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

// See this for possible implementation approaches:
// https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705

export const MiniCircleChartRoot = styled('div')({
  display: 'flex',
  width: 16,
  height: 16,
  padding: 3,
  fontSize: 10,
  border: '1px dashed white',
  borderRadius: '50%',
  textTransform: 'uppercase',
  color: 'white',

  '&:not(:last-of-type)': {
    marginRight: 10
  }
});

export interface MiniCircleChartProps {
  percentComplete?: number;
}

export function MiniCircleChart({ percentComplete }: MiniCircleChartProps) {
  return <MiniCircleChartRoot />;
}
