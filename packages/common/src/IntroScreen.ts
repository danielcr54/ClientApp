import React from 'react';
import styled from '@emotion/styled';

export const IntroScreen = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
});

export const IntroScreenHeading = styled('h1')({
  margin: '0 0 20px',
  fontWeight: 200,
  fontFamily: '"Courier New", monospace',
  fontSize: 30,
  color: '#8e65c7'
});

export const IntroScreenSubheading = styled('h2')({
  margin: '0 0 20px',
  fontSize: 16,
  fontWeight: 300,
  letterSpacing: 2,
  color: '#888',
  textTransform: 'uppercase'
});

export const IntroScreenText = styled('div')({
  margin: 0,
  fontSize: 14,
  color: '#999'
});
