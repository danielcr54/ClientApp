import React from 'react';
import styled from '@emotion/styled';
import { IggLogo } from '../logos/IggLogo';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface LogoLinkProps extends NavLinkProps {
  size?: number;
}

const DEFAULT_SIZE = 36;

export const LogoLinkRoot = styled(NavLink)(({ size }: LogoLinkProps) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size || DEFAULT_SIZE,
  height: size || DEFAULT_SIZE
}));

export function LogoLink(props: LogoLinkProps) {
  return (
    <LogoLinkRoot {...props}>
      <IggLogo />
    </LogoLinkRoot>
  );
}

export default LogoLink;
