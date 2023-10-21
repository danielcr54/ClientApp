import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

export const ActionLinks = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start'
});

export default ActionLinks;

export const ActionLinksItem = styled('div')({
  fontSize: 13,

  '&:not(:last-of-type)': {
    '&::after': {
      content: '"."',
      margin: '0 10px',
      color: colors.white
    }
  }
});
