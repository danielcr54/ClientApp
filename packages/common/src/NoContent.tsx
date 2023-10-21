import React, { ComponentType } from 'react';
import styled from '@emotion/styled';

interface NoContentStyledProps {
  small?: boolean;
}

const NoContentRoot = styled('div')(({ small }: NoContentStyledProps) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: small ? '25px 15px' : '50px 20px',
  backgroundColor: 'rgba(59, 50, 82, 0.3)',
  borderRadius: 2,
  textAlign: 'center'
}));

const NoContentIcon = styled('div')(({ small }: NoContentStyledProps) => ({
  fontSize: small ? 24 : 36,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.8)',

  '&:not(:last-of-type)': {
    marginBottom: small ? 10 : 15
  }
}));

const NoContentMessage = styled('div')(({ small }: NoContentStyledProps) => ({
  fontSize: small ? 15 : 18,
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 1)',
  lineHeight: 1.3,

  '&:not(:last-of-type)': {
    marginBottom: small ? 5 : 8
  }
}));

const NoContentNote = styled('div')(({ small }: NoContentStyledProps) => ({
  fontSize: small ? 11 : 13,
  color: 'rgba(255, 255, 255, 0.55)',
  lineHeight: 1.3
}));

export interface NoContentProps extends NoContentStyledProps {
  className?: string;
  message: string;
  note?: string;
  icon?: ComponentType;
}

export function NoContent({
  icon,
  message,
  note,
  className,
  ...styledProps
}: NoContentProps) {
  const Icon = icon;

  return (
    <NoContentRoot className={className} {...styledProps}>
      {Icon && (
        <NoContentIcon {...styledProps}>
          <Icon />
        </NoContentIcon>
      )}
      <NoContentMessage {...styledProps}>{message}</NoContentMessage>
      <NoContentNote {...styledProps}>{note}</NoContentNote>
    </NoContentRoot>
  );
}

export default NoContent;
