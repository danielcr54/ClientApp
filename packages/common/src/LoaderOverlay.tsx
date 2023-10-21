import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from './styleSettings';
import { Loader } from './Loader';

export interface LoaderOverlayStyledProps {
  loading?: boolean;
}

export const LoaderOverlayContainer = styled('div')({
  position: 'relative'
});

export const LoaderOverlayBackdrop = styled('div')(
  ({ loading }: LoaderOverlayStyledProps) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10000, // Note the local stacking context
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: loading ? 'rgba(35, 31, 50, 0.7)' : 'rgba(35, 31, 50, 0)',
    opacity: loading ? 1 : 0,
    transition: 'all 0.2s',
    color: colors.white,
    pointerEvents: loading ? 'all' : 'none'
  })
);

export interface LoaderOverlayProps {
  children?: ReactNode;
  loading?: boolean;
  loaderSize?: number;
}

export function LoaderOverlay({
  children,
  loading,
  loaderSize
}: LoaderOverlayProps) {
  return (
    <LoaderOverlayContainer>
      <LoaderOverlayBackdrop loading={loading}>
        <Loader size={loaderSize} />
      </LoaderOverlayBackdrop>

      {children}
    </LoaderOverlayContainer>
  );
}
