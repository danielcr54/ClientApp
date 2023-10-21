import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ModalHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  padding: '25px 12px',

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '25px'
  },

  [`@media ${deviceScreenQuery.large}`]: {
    padding: '25px 20px'
  }
});

export default ModalHeader;
