import React from 'react';
import styled from '@emotion/styled';
import { LogoLink } from '../nav';
import { colors, deviceScreenQuery } from '../styleSettings';

const SCREEN_HEADER_LOGO_SIZE = 27;

export const ScreenHeaderLogoLink = styled(LogoLink)({
  padding: '16px 15px',
  width: 55,
  height: 59,

  '& svg': {
    width: SCREEN_HEADER_LOGO_SIZE,
    height: SCREEN_HEADER_LOGO_SIZE
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    width: 58,
    borderRight: `1px solid ${colors.lighterDark}`
  }
});
