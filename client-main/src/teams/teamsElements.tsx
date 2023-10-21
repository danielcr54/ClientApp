import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { styleSettings } from '@igg/common';

const { colors, deviceScreenQuery } = styleSettings;
const cardBgColor = '#393350';

// A set of feature-agnostic helper styled components
// to be across "Teams" and other features referencing
// "Teams"

// NOTE: Some of them are to be extracted to a separate component file
// once grows large/complex enough

// Team title and title link

export interface TeamTitleProps {
  large?: boolean;
  size?: number;
  bold?: boolean;
}

export const TeamTitle = styled('span')(({ size, large, bold }: TeamTitleProps) => ({
  fontSize: size ? size : large ? 28 : 18,
  fontWeight: bold ? 600 : 500,
  color: 'white',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none'
  }
}));

export const TeamTitleLink = styled(TeamTitle.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !['large', 'size'].includes(prop)
})();

// Members metadata

export const TeamMembersMeta = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});

// TODO: Perhaps make a separate component with props, some logic, etc
export const TeamMemberInlineAvatars = styled('div')({
  display: 'inline-flex',
  color: 'rgba(255, 255, 255, 0.55)',

  '&:not(:last-of-type)': {
    marginRight: 8
  }
});

export interface TeamMemberInlineAvatarsItemProps {
  size?: number;
}

export const TeamMemberInlineAvatarsItem = styled('div')(
  ({ size }: TeamMemberInlineAvatarsItemProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size ? size : 16,
    height: size ? size : 16,
    fontSize: 8,
    borderRadius: '50%',
    border: `1px solid ${cardBgColor}`,
    backgroundColor: colors.dark,
    color: 'white',

    '&:not(:last-of-type)': {
      marginRight: -3
    }
  })
);

export const TeamMembersMetaText = styled('div')({
  display: 'inline-block',
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)'
});
