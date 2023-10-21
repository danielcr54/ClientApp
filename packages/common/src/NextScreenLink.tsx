import React, { ComponentType } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { IoIosArrowForward as RightArrowIcon } from 'react-icons/io';
import { colors } from './styleSettings';
import { CircleIconButton } from './buttons';

const NextScreenLinkRoot = styled(NavLink)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  textDecoration: 'none',
  color: colors.white,
  transition: 'all 0.2s',
  cursor: 'pointer',

  '&:hover': {
    color: colors.secondary
  }
});

const NextScreenLinkLabels = styled('div')({
  flex: 1,
  textAlign: 'right',
  marginRight: 15
});

const NextScreenLinkSmallLabel = styled('div')({
  fontSize: 11,
  marginBottom: 5
});

const NextScreenLinkLabel = styled('div')({
  fontSize: 22,
  textTransform: 'uppercase'
});

export interface NextScreenLinkProps extends NavLinkProps {
  label?: string;
  smallLabel?: string;
}

const NextScreenLinkButton = styled(CircleIconButton)().withComponent('div');

export function NextScreenLink({
  label,
  smallLabel,
  ...navLinkProps
}: NextScreenLinkProps) {
  return (
    <NextScreenLinkRoot {...navLinkProps}>
      {(label || smallLabel) && (
        <NextScreenLinkLabels>
          {smallLabel && (
            <NextScreenLinkSmallLabel>{smallLabel}</NextScreenLinkSmallLabel>
          )}
          {label && <NextScreenLinkLabel>{label}</NextScreenLinkLabel>}
        </NextScreenLinkLabels>
      )}

      <NextScreenLinkButton>
        <RightArrowIcon />
      </NextScreenLinkButton>
    </NextScreenLinkRoot>
  );
}

export default NextScreenLink;
