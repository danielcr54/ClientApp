import styled from '@emotion/styled';

export const PlayerList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const PlayerListItem = styled('div')({
  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});
