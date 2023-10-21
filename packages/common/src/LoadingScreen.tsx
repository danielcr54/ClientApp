import React from 'react';
import styled from '@emotion/styled';
import { SpinnerIcon } from './icons';
import { StarBackground } from './StarBackground';

const LoadingScreenRoot = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh'
});

export function LoadingScreen() {
  return (
    <>
      <StarBackground />
      <LoadingScreenRoot>
        <SpinnerIcon size={65} />
      </LoadingScreenRoot>
    </>
  );
}
