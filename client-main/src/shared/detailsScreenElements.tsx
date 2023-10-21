import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery } = styleSettings;

// A set of feature-agnostic helper styled components
// to be used on "details" screens

// TODO: Some components are to be abstracted to a more
// generic "screen" level

export const DetailsScreenSection = styled('section')({
  // TODO
});

export const DetailsScreenSectionHeader = styled('header')({
  marginBottom: 10,
  padding: '8px 0',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});

export const DetailsScreenSectionBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  marginBottom: 15,

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

export const DetailsScreenSectionMain = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginBottom: 15,

  [`@media ${deviceScreenQuery.medium}`]: {
    '&:not(:last-of-type)': {
      marginRight: 16
    }
  }
});

export const DetailsScreenSectionAside = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: 15,

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '33%'
  }
});

export const DetailsCardContainer = styled('div')({
  [`@media ${deviceScreenQuery.medium}`]: {
    marginBottom: 40
  }
});
