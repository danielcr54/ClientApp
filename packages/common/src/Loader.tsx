import React from 'react';
import styled from '@emotion/styled';
import { SpinnerIcon } from './icons';

export interface LoaderStyledProps {
  inline?: boolean;
  size?: number;
}

export const LoaderContainer = styled('div')({
  position: 'relative'
});

export const LoaderRoot = styled('div')(({ inline }: LoaderStyledProps) => ({
  display: inline ? 'inline-flex' : 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export type LoaderProps = LoaderStyledProps;

export function Loader({ inline, size }: LoaderProps) {
  return (
    <LoaderRoot inline={inline} size={size}>
      <SpinnerIcon size={size || 65} />
    </LoaderRoot>
  );
}
