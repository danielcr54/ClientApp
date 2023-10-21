import React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { NavLink } from 'react-router-dom';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

export interface AvatarProps {
  large?: boolean;
  size?: number;
  textSize?: number;
}

export const Avatar = styled('div')(
  ({ large, size, textSize }: AvatarProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size ? size : large ? 50 : 32,
    height: size ? size : large ? 50 : 32,
    borderRadius: '50%',
    fontSize: textSize ? textSize : size ? size / 2.5 : large ? 20 : 14,
    backgroundColor: '#393350',
    // backgroundColor: colors.dark,
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none'
    }
  })
);

export const AvatarLink = styled(Avatar.withComponent(NavLink), {
  shouldForwardProp: prop =>
    isPropValid(prop) && !['large', 'size'].includes(prop)
})();
