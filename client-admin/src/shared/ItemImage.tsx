import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { colors } from '@igg/common/lib/styleSettings';

// Visual components

interface ItemImageStyledProps {
  circle?: boolean;
  dark?: boolean;
  size?: number;
  large?: boolean;
  inline?: boolean;
}

const ItemImageRoot = styled('div')(
  ({ circle, dark, size, large, inline }: ItemImageProps) => ({
    display: inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size ? size : large ? 90 : 75,
    height: size ? size : large ? 90 : 75,
    border: 0,
    borderRadius: circle ? '50%' : '33%',
    fontSize: 11,
    backgroundColor: dark ? colors.dark : '#393350',
    color: colors.white,
    textDecoration: 'none',
    overflow: 'hidden',

    '& > img': {
      width: '100%',
      height: '100%',
      maxWidth: '120%',
      maxHeight: '120%',
      objectFit: 'cover'
    }
  })
);

export interface ItemImageProps extends ItemImageStyledProps {
  imageUrl?: string;
  imageAltLabel?: string;
  renderFallback?: () => ReactNode;
}

export function ItemImage({
  imageUrl,
  imageAltLabel,
  renderFallback,
  ...styledProps
}: ItemImageProps) {
  return (
    <ItemImageRoot {...styledProps}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAltLabel} />
      ) : typeof renderFallback === 'function' ? (
        renderFallback()
      ) : null}
    </ItemImageRoot>
  );
}

// NavLink assistance helpers

export const StyledItemImageNavLink = styled(NavLink)({
  display: 'inline',
  textDecoration: 'none',
  margin: 0,
  padding: 0
});
