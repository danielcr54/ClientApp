import React from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery, screenSizes } from '../styleSettings';

export const ActionScreenContentLayout = styled('div')({
  flex: 1,
  justifyContent: 'stretch',
  width: '100%',

  [`@media ${deviceScreenQuery.large}`]: {
    display: 'flex'
  }
});

export const ActionScreenMain = styled('main')({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: '0 12px 30px',

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '0 30px 30px'
  },

  [`@media ${deviceScreenQuery.large}`]: {
    padding: '0 45px 30px'
  },

  [`@media ${deviceScreenQuery.xlarge}`]: {
    flex: 1
  }
});

export const ActionScreenMainContainer = styled('div')({
  maxWidth: 480,
  width: '100%'
});

export const ActionScreenFormContainer = styled(ActionScreenMainContainer)({
  maxWidth: 585
});

export const ActionScreenAside = styled('aside')({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0 12px 30px',

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '0 30px 30px'
  },

  [`@media ${deviceScreenQuery.large}`]: {
    padding: '0 45px 30px'
  },

  [`@media ${deviceScreenQuery.xlarge}`]: {
    width: '25%',
    padding: '0 55px 30px'
  }
});

export const ActionScreenAsideContainer = styled('div')({
  maxWidth: 480,
  display: 'flex',
  alignItems: 'flex-end'
});
