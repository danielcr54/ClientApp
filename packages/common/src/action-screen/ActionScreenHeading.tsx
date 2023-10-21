import React from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ActionScreenHeading = styled('h1')({
  marginBottom: 15,
  fontSize: 30,
  fontWeight: 500,

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 36
  }
});

export default ActionScreenHeading;
