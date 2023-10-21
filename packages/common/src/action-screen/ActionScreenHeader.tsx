import React from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ActionScreenHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  padding: '25px 12px',

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '25px 30px'
  },

  [`@media ${deviceScreenQuery.large}`]: {
    padding: '25px 45px'
  }
});

export default ActionScreenHeader;


export const ActionScreenHeaderStart = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center'
});

export const ActionScreenHeaderEnd = styled('div')({
  display: 'flex',
  alignItems: 'center',

  [`@media ${deviceScreenQuery.large}`]: {
    paddingRight: 15
  },

  [`@media ${deviceScreenQuery.xlarge}`]: {
    paddingRight: 50
  }
});
