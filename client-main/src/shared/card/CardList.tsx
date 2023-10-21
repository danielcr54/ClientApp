import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery } = styleSettings;

const minItemWidth = 270;

export const CardList = styled('div')({
  display: 'grid',
  gridGap: 16,
  gridRowGap: 0,
  gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
  flexWrap: 'wrap',

  '&:not(:last-of-type)': {
    marginBottom: 10
  }
});

export const CardListItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  width: '100%',
  marginBottom: 16,

  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: 16,

    '& > *': {
      flex: 1
    }
  }
});
