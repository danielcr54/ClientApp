import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { IoMdWarning } from 'react-icons/io';
import { colors, deviceScreenQuery } from '../styleSettings';

export const FormErrorRoot = styled('div')({
  display: 'flex',
  marginBottom: 25,
  padding: '14px 16px',
  borderRadius: 2,
  backgroundColor: colors.danger,

  [`@media ${deviceScreenQuery.small}`]: {
    padding: '16px 20px',
    marginBottom: 35
  }
});

export const FormErrorFigure = styled('div')({
  marginRight: 9,
  fontSize: 16,
  color: 'rgba(255, 255, 255, 0.35)',

  [`@media ${deviceScreenQuery.small}`]: {
    marginRight: 12,
    fontSize: 20
  }
});

export const FormErrorContent = styled('div')({
  flex: 1,
  paddingTop: 2,
  fontSize: 13,
  lineHeight: 1.4,
  color: colors.white
});

export const FormErrorTitle = styled('div')({
  marginBottom: 5,
  fontSize: 14,
  lineHeight: 1.3,
  fontWeight: 500,
  color: colors.white,

  [`@media ${deviceScreenQuery.small}`]: {
    fontSize: 16
  }
});

export interface FormErrorProps {
  title?: string;
  children?: ReactNode;
}

export function FormError({ title, children }: FormErrorProps) {
  return (
    <FormErrorRoot>
      <FormErrorFigure>
        <IoMdWarning />
      </FormErrorFigure>

      <FormErrorContent>
        {title && <FormErrorTitle>{title}</FormErrorTitle>}
        {children}
      </FormErrorContent>
    </FormErrorRoot>
  );
}
