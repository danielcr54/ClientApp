import React from 'react';
import styled from '@emotion/styled';
import 'flag-icon-css/css/flag-icon.css';

interface CountryFlagIconStyleProps {
  size: number;
  inline?: boolean;
}

const CountryFlagIconRoot = styled('div')(
  ({ size, inline }: CountryFlagIconStyleProps) => ({
    display: inline ? 'inline-flex' : 'flex',
    fontSize: size - size / 10,
    lineHeight: 1,
    color: 'white'
  })
);

interface CountryFlagIconProps {
  countryCode?: string;
  size?: number;
}

export function CountryFlagIcon({ size, countryCode }: CountryFlagIconProps) {
  size = size || 16;

  return (
    <CountryFlagIconRoot size={size}>
      <span
        className={`flag-icon flag-icon-${
          countryCode ? countryCode.toLowerCase() : ''
        }`}
      />
    </CountryFlagIconRoot>
  );
}
