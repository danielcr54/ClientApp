import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ScreenBody = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  paddingTop: 105,

  [`@media ${deviceScreenQuery.medium}`]: {
    paddingTop: 59,
    paddingLeft: 58
  }
});

export const ScreenBodyLayout = styled('div')({
  position: 'relative',
  flex: 1,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%'
});
