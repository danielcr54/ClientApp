import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ActionScreenSubheading = styled('div')({
  fontSize: 14,
  color: 'white',
  opacity: 0.88,
  lineHeight: 1.5,
  
  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 18,
    lineHeight: 1.7,
  }
});

export default ActionScreenSubheading;
