import React from 'react';
import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from '../styleSettings';

export const ScreenHeader = styled('header')({
  position: 'fixed',
  zIndex: 99,
  display: 'flex',
  width: '100%',
  borderWidth: 0,
  borderStyle: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: colors.lighterDark,
  backgroundColor: colors.dark
});

// Positioning helpers

export const ScreenHeaderStart = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center'
});

export const ScreenHeaderEnd = styled('div')({
  display: 'flex',
  alignItems: 'center',

  [`@media ${deviceScreenQuery.large}`]: {
    paddingRight: 15
  },

  [`@media ${deviceScreenQuery.xlarge}`]: {
    paddingRight: 50
  }
});

// Generic header item

export const ScreenHeaderItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 13px',

  [`@media ${deviceScreenQuery.medium}`]: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

export const ScreenHeaderItemDivider = styled('div')({
  height: '40%',
  width: 1,
  margin: '0 4px',
  backgroundColor: colors.fadedLighterDark
  // backgroundColor: '#2f293d'
});
