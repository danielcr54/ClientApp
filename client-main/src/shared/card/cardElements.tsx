import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

// A set of feature-agnostic helper styled components
// to be used with `Card`s

export interface CardSectionProps {
  borderTop?: boolean;
  alignContentCenter?: boolean;
}

export const CardSection = styled('div')(({ borderTop }: CardSectionProps) => ({
  width: '100%',

  '&:not(:first-of-type)': {
    borderTop: borderTop ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  }
}));

export const CardMainSection = styled(CardSection)({
  flex: 1
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // padding: '15px 15px 20px',
  // textAlign: 'center'
});

// Abstract layout components

export interface CardRowProps {
  wrap?: boolean;
}

export const CardRow = styled('div')(({ wrap }: CardRowProps) => ({
  display: 'flex',
  width: '100%',
  flexWrap: wrap ? 'wrap' : 'inherit'
}));

export interface CardCellProps {
  alignEnd?: boolean;
  alignTop?: boolean;
  borderRight?: boolean;
  large?: boolean;
  grow?: boolean;
}

export const CardCell = styled('div')(
  ({ alignEnd, alignTop, borderRight, large, grow }: CardCellProps) => ({
    flex: 1,
    flexGrow: grow !== false ? 1 : 0,
    flexShrink: 0,
    display: 'flex',
    padding: large ? '18px 20px' : '10px 16px',
    alignItems: alignTop ? 'flex-start' : 'center',
    justifyContent: alignEnd ? 'flex-end' : 'flex-start',

    '&:not(:last-of-type)': {
      borderRight: borderRight ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    }
  })
);

// Various elements

// Arbitrary "highlight" text

export const CardHighlightText = styled('div')({
  fontSize: 13,
  lineHeight: 1.4,
  color: 'rgba(255, 255, 255, 0.55)'
});

// Platform icon

export const CardConsoleIcon = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  color: 'white',

  '&:not(:last-of-type)': {
    marginRight: 10
  }
});

export const CardContentFigure = styled('div')({
  marginBottom: 10
});

// Card content labels

// Title and title link

export interface CardTitleProps {
  size?: number;
  bold?: boolean;
  large?: boolean;
  alignLeft?: boolean;
}

export const CardTitle = styled('span')(
  ({ size, bold, large, alignLeft }: CardTitleProps) => ({
    marginBottom: 10,
    fontSize: size ? size : large ? 28 : 18,
    fontWeight: bold || large ? 500 : 400,
    color: 'white',
    textAlign: alignLeft ? 'left' : 'center',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none'
    }
  })
);

export const CardTitleLink = styled(CardTitle.withComponent(NavLink), {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'large'
})();

export const CardContentMeta = styled('div')({
  '&:not(:last-of-type)': {
    marginBottom: 18
  }
});

export interface CardContentSublabelsProps {
  alignCenter?: boolean;
}

export const CardContentSublabels = styled('div')(
  ({ alignCenter }: CardContentSublabelsProps) => ({
    textAlign: 'center',

    '&:not(:last-of-type)': {
      marginBottom: 5
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      textAlign: alignCenter ? 'center' : 'left',

      '& > *:not(:last-of-type)': {
        paddingRight: 10,
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        marginRight: 10
      }
    }
  })
);

export const CardContentSublabel = styled('div')({
  display: 'block',
  fontSize: 13,
  lineHeight: 1.4,
  color: 'rgba(255, 255, 255, 0.55)',
  whiteSpace: 'nowrap',

  '&:not(:last-of-type)': {
    marginBottom: 5
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'inline-block'
  }
});

export const CardContentSublabelSpacer = styled('div')({
  display: 'inline-block',
  width: 0,
  height: 15,

  '&:not(:last-of-type)': {
    marginRight: 10
  }
});

export const CardContentSublabelDivider = styled(CardContentSublabelSpacer)({
  width: 1,
  backgroundColor: 'white',
  opacity: 0.1
});

// Card actions blocks

export interface CardContentActionsProps {
  spaceAfter?: number;
  stretch?: boolean;
}

export const CardContentActions = styled('div')(
  ({ spaceAfter, stretch }: CardContentActionsProps) => ({
    width: stretch ? '100%' : 'auto',
    marginBottom: typeof spaceAfter !== 'undefined' ? spaceAfter : 0,

    '&:not(:last-of-type)': {
      marginBottom: typeof spaceAfter !== 'undefined' ? spaceAfter : 15
    }
  })
);

export const CardContentActionsItem = styled('div')({
  display: 'inline-block',

  '&:not(:last-of-type)': {
    marginRight: 10
  }
});

export const CardActions = styled('div')({
  width: '100%'
});

// To assist with "stats" cells

export const CardStat = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center'
});

export const CardStatValue = styled('div')({
  display: 'block',
  fontSize: 18,
  color: 'white'
});

export const CardStatLabel = styled('div')({
  display: 'block',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});

// Arbitrary message

export interface CardMessageProps {
  alignCenter?: boolean;
  hasSpacing?: boolean;
}

export const CardMessage = styled('div')(
  ({ alignCenter, hasSpacing }: CardMessageProps) => ({
    width: '100%',
    padding: hasSpacing !== false ? 10 : 0,
    textAlign: alignCenter ? 'center' : 'left',
    color: colors.white
  })
);

export const CardMessageNote = styled('div')({
  display: 'block',
  width: '100%',
  paddingTop: 5,
  fontSize: 13,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)'
});
