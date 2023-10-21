import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

const cardBgColor = '#393350';

export interface CardProps {
  faded?: boolean;
}

export const Card = styled('div')(({ faded }: CardProps) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  width: '100%',
  borderRadius: 2,
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: faded ? 1 : 0,
  backgroundColor: faded ? colors.fadedLighterDark : cardBgColor
}));

export const CardHeader = styled('header')({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%'
});

export interface CardHeaderCellProps {
  main?: boolean;
  alignEnd?: boolean;
}

export const CardHeaderCell = styled('div')(
  ({ main, alignEnd }: CardHeaderCellProps) => ({
    flexGrow: main ? 1 : 0,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: alignEnd ? 'flex-end' : 'flex-start',
    minHeight: 43,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    fontSize: 13,

    '&:first-of-type': {
      paddingLeft: 16
    }
  })
);

export interface CardContentProps {
  large?: boolean;
  // TODO: This is hacky, refactor and implement in a more reliable/intuitive way
  forceHorizontal?: boolean;
  padding?: number | string;
  paddingTop?: number | string;
}

export const CardContent = styled('div')(
  ({ large, forceHorizontal, padding, paddingTop }: CardContentProps) => ({
    flex: 1,
    display: 'flex',
    flexDirection: forceHorizontal ? 'row' : 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    width: '100%',
    padding: padding ? padding : large ? 25 : 16,
    paddingTop:
      typeof paddingTop !== 'undefined'
        ? paddingTop
        : padding
        ? padding
        : large
        ? 25
        : 16,

    [`@media ${deviceScreenQuery.medium}`]: {
      flexDirection: 'row'
    }
  })
);

export interface CardContentCellProps {
  main?: boolean;
  forceAlignStart?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  verticalAlignCenter?: boolean;
  stretch?: boolean;
  spacing?: number;
  verticalSpacing?: number;
  rowContext?: boolean;
}

export const CardContentCell = styled('div')(
  ({
    main,
    forceAlignStart,
    alignCenter,
    alignEnd,
    stretch,
    spacing,
    verticalSpacing,
    verticalAlignCenter,
    rowContext
  }: CardContentCellProps) => ({
    flexGrow: main ? 1 : 0,
    flexShrink: main ? 1 : 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: stretch ? 'stretch' : forceAlignStart ? 'flex-start' : 'center',
    justifyContent: verticalAlignCenter ? 'center' : 'flex-start',
    textAlign: forceAlignStart ? 'left' : 'center',

    '&:not(:last-of-type)': {
      marginBottom: rowContext
        ? 0
        : typeof verticalSpacing !== 'undefined'
        ? verticalSpacing
        : 15
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      alignItems: stretch
        ? 'stretch'
        : alignCenter
        ? 'center'
        : alignEnd
        ? 'flex-end'
        : 'flex-start',
      textAlign: alignCenter ? 'center' : alignEnd ? 'right' : 'left',

      '&:not(:last-of-type)': {
        marginBottom: 0,
        marginRight: typeof spacing !== 'undefined' ? spacing : 15
      }
    }
  })
);
