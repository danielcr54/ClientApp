import React from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

const bgColor = '#393350';

// Screen-level wrappers

export const HeroActionBlockSection = styled('div')({
  marginBottom: 15,

  [`@media ${deviceScreenQuery.medium}`]: {
    marginBottom: 45
  }
});

export interface ActionBlockStyleProps {
  large?: boolean;
  alignCenter?: boolean;
  // TODO: Make relied on some sort of design system instead
  mobileAlignCenter?: boolean;
}

export const ActionBlock = styled('div')(
  ({ large, alignCenter, mobileAlignCenter }: ActionBlockStyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    width: '100%',
    fontSize: 15,
    borderRadius: 2,
    backgroundColor: bgColor,

    '&:not(:last-of-type)': {
      marginBottom: 16
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      flexDirection: 'row'
    }
  })
);

export const ActionBlockMain = styled('div')({
  width: '100%',

  [`@media ${deviceScreenQuery.medium}`]: {
    flex: 1
  }
});

export const ActionBlockAside = styled('div')({
  width: '100%',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',

  [`@media ${deviceScreenQuery.medium}`]: {
    borderTop: 'none',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    width: '33.3%'
  }
});

// Actual content container
export const ActionBlockContent = styled('div')(
  ({ large, alignCenter, mobileAlignCenter }: ActionBlockStyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 25,
    alignItems: mobileAlignCenter ? 'center' : 'flex-start',
    textAlign: mobileAlignCenter ? 'center' : 'left',

    [`@media ${deviceScreenQuery.medium}`]: {
      padding: 40,
      alignItems: alignCenter ? 'center' : 'flex-start',
      textAlign: alignCenter ? 'center' : 'left'
    }
  })
);

export const ActionBlockHeading = styled('div')(
  ({ large }: ActionBlockStyleProps) => ({
    marginBottom: 5,
    fontSize: large ? 24 : 20,
    fontWeight: 500,
    lineHeight: 1.2,

    [`@media ${deviceScreenQuery.medium}`]: {
      fontSize: large ? 35 : 22
    }
  })
);

export const ActionBlockText = styled('p')(
  ({ large }: ActionBlockStyleProps) => ({
    fontSize: 14,
    lineHeight: 1.5,
    color: 'rgba(255, 255, 255, 0.81)',

    [`@media ${deviceScreenQuery.medium}`]: {
      fontSize: 18
    }
  })
);

export const ActionBlockActions = styled('div')(
  ({ large }: ActionBlockStyleProps) => ({
    '&:not(:first-of-type)': {
      paddingTop: 20
    }
  })
);

// Aside part

export const ActionBlockNote = styled('div')({});

export const ActionBlockNoteFigure = styled('div')({
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: '#ffc200',
  overflow: 'hidden',
  marginBottom: 15
});

export const ActionBlockNoteHeading = styled('div')({
  fontSize: 15,
  color: 'white',
  marginBottom: 5,

  '& strong': {
    fontWeight: 500
  }
});

export const ActionBlockNoteText = styled('p')({
  fontSize: 13,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.55)'
});
