import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { styleSettings } from '@igg/common';

// TODO: Should be a button, with a separate CardLikeButtonLink
// sibling component created in parallel

const { deviceScreenQuery, colors } = styleSettings;

const bgColor = '#393350';
const textColor = 'white';

export const CardLikeButtonRoot = styled(NavLink)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  fontSize: 15,
  padding: '25px 15px',
  fontWeight: 'normal',
  lineHeight: 1,
  border: 0,
  borderRadius: 2,
  backgroundColor: bgColor,
  color: textColor,
  textAlign: 'center',
  textDecoration: 'none',
  outline: 'none',
  transition: 'all 0.2s',

  '&:focus': {
    // backgroundColor:
  },

  '&:hover, &:hover:focus': {
    // TODO: Make a variable (its same as a focused input)
    backgroundColor: '#4d3e74',
    textDecoration: 'none',
    cursor: 'pointer'
  },

  '&:active, &:active:hover': {
    // backgroundColor:
  }
});

export const CardLikeButtonIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  fontSize: 18,
  borderRadius: 2,
  backgroundColor: colors.main,
  color: 'white',

  '&:not(:last-of-type)': {
    marginBottom: 22
  }
});

export const CardLikeButtonLabel = styled('div')({
  fontSize: 15,
  color: 'white',

  '&:not(:last-of-type)': {
    marginBottom: 8
  }
});

export const CardLikeButtonSublabel = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)'
});

export interface CardLikeButtonProps extends NavLinkProps {
  icon?: ReactNode;
  label?: string;
  sublabel?: string;
}

export function CardLikeButton({
  icon,
  label,
  sublabel,
  ...navLinkProps
}: CardLikeButtonProps) {
  return (
    <CardLikeButtonRoot {...navLinkProps}>
      {icon && (
        <CardLikeButtonIcon>
          {icon}
        </CardLikeButtonIcon>
      )}

      {label && <CardLikeButtonLabel>{label}</CardLikeButtonLabel>}
      {sublabel && <CardLikeButtonSublabel>{sublabel}</CardLikeButtonSublabel>}
    </CardLikeButtonRoot>
  );
}

export default CardLikeButton;
