import React from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const ScreenContent = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});

export const ScreenContentContainer = styled('div')({
  flex: 1,
  width: '100%',
  maxWidth: 900,
  margin: '0 auto',
  padding: '30px 12px',

  [`@media ${deviceScreenQuery.small}`]: {
    maxWidth: 925,
    padding: '30px 20px'
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    maxWidth: 945,
    padding: '50px 30px'
  }
});

export const ScreenContentFormContainer = styled('div')({
  maxWidth: 585
});

// Structure elements

export const ScreenContentHeader = styled('header')({
  paddingBottom: 25
});

export const ScreenContentHeaderLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

export interface ScreenContentHeaderCellProps {
  alignTop?: boolean;
  alignBottom?: boolean;
  alignEnd?: boolean;
  alignStart?: boolean;
}

export const ScreenContentHeaderStart = styled('div')(
  ({ alignTop, alignBottom, alignEnd }: ScreenContentHeaderCellProps) => ({
    flexBasis: 'auto',
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',

    '&:not(:last-of-type)': {
      marginBottom: 15
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      width: 'auto',
      flexGrow: 1,
      justifyContent: alignTop
        ? 'flex-start'
        : alignBottom
        ? 'flex-end'
        : 'center',
      alignItems: alignEnd ? 'flex-end' : 'flex-start',

      '&:not(:last-of-type)': {
        marginBottom: 0,
        marginRight: 15
      }
    }
  })
);

export const ScreenContentHeaderEnd = styled('div')(
  ({
    alignTop,
    alignBottom,
    alignStart,
    alignEnd
  }: ScreenContentHeaderCellProps) => ({
    flexBasis: 'auto',
    flexShrink: 0,
    display: 'flex',
    width: '100%',

    [`@media ${deviceScreenQuery.small}`]: {
      width: 'auto',
      flexGrow: 0,
      justifyContent: alignTop
        ? 'flex-start'
        : alignBottom
        ? 'flex-end'
        : 'center',
      alignItems: alignEnd ? 'flex-end' : 'flex-start'
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      width: 'auto',
      flexGrow: 0,
      justifyContent: alignTop
        ? 'flex-start'
        : alignBottom
        ? 'flex-end'
        : 'center',
      alignItems: alignStart ? 'flex-start' : 'flex-end'
    }
  })
);

export const ScreenContentHeaderMain = styled('div')({
  flex: 1,

  '&:not(:last-of-type)': {
    marginBottom: 10,

    [`@media ${deviceScreenQuery.medium}`]: {
      marginBottom: 0,
      marginRight: 15
    }
  }
});

// Note that this is intentionally `div` to be targeted with :last-of-type pseudo
export const ScreenContentHeaderAside = styled('div')({});

export interface ScreenContentBodyProps {
  flex?: boolean;
}

export const ScreenContentBody = styled('main')(
  {
    flex: 1
  },
  ({ flex }: ScreenContentBodyProps) => ({
    display: flex === false ? 'block' : 'flex',
    flexDirection: 'column'
  })
);

export const ScreenContentFooter = styled('footer')({});

// Various helpers

export const ScreenContentHeading = styled('h1')({
  marginBottom: 10,
  fontSize: 38,
  fontWeight: 500,

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 48
  }
});

export const ScreenContentSubheading = styled('div')({
  fontSize: 14,
  lineHeight: 1.5,
  color: 'white',
  opacity: 0.88,

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 18
  }
});

export const ScreenContentSection = styled('div')({
  '&:not(:last-of-type)': {
    marginBottom: 40
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    '&:not(:last-of-type)': {
      marginBottom: 55
    }
  }
});
