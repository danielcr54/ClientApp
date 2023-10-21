import styled from '@emotion/styled';

export const StretchToContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',

  '& > *': {
    flexGrow: 1
  }
});
